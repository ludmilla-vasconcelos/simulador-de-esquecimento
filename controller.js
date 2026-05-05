// controller.js - Controlador principal do Simulador de Esquecimento

// Intervalos da Curva de Ebbinghaus (em dias)
const INTERVALOS_REVISAO = [1, 7, 30];
const NOMES_CICLO = [
    "1ª Revisão (24h)",
    "2ª Revisão (7 dias)",
    "3ª Revisão (30 dias)"
];

function calcularStatus(materia) {
    const ciclo = materia.cicloAtual || 0;
    const refDate = materia.dataReferencia || materia.data;

    if (ciclo >= INTERVALOS_REVISAO.length) {
        return { cor: "dominado", texto: "Conteúdo Dominado!", diasRestantes: 0, proximaRevisao: null };
    }

    const agora = new Date();
    const referencia = new Date(refDate + (refDate.includes("T") ? "" : "T00:00:00"));
    const diffMs = agora.getTime() - referencia.getTime();
    const diffDias = diffMs / (1000 * 60 * 60 * 24);
    const intervalo = INTERVALOS_REVISAO[ciclo];
    const diasRestantes = intervalo - diffDias;

    let cor;
    if (diasRestantes > intervalo * 0.5) {
        cor = "verde";
    } else if (diasRestantes > 0) {
        cor = "amarelo";
    } else {
        cor = "vermelho";
    }

    const proximaRevisaoDate = new Date(referencia.getTime() + intervalo * 24 * 60 * 60 * 1000);

    return {
        cor,
        texto: NOMES_CICLO[ciclo],
        diasRestantes: Math.ceil(diasRestantes),
        proximaRevisao: proximaRevisaoDate
    };
}

function formatarData(dataStr) {
    return new Date(dataStr + "T00:00:00").toLocaleDateString("pt-BR");
}

function textoStatus(status) {
    if (status.cor === "dominado") return "Conteúdo dominado!";
    if (status.cor === "vermelho") return status.texto + " — Revisão atrasada!";
    if (status.cor === "amarelo") {
        if (status.diasRestantes <= 1) return status.texto + " — Falta menos de 1 dia";
        return status.texto + " — Faltam " + status.diasRestantes + " dias";
    }
    if (status.diasRestantes <= 1) return status.texto + " — Falta menos de 1 dia";
    return status.texto + " — Faltam " + status.diasRestantes + " dias";
}

function iconeCor(cor) {
    if (cor === "verde") return "🟢";
    if (cor === "amarelo") return "🟡";
    if (cor === "vermelho") return "🔴";
    return "🏆";
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

window.addEventListener("load", async () => {
    await iniciarBanco();

    const abaCadastro = document.getElementById("aba-cadastro");
    const abaLista = document.getElementById("aba-lista");
    const abaSobre = document.getElementById("aba-sobre");
    const dica = document.getElementById("dica-especialista");

    const btnInicio = document.getElementById("link-inicio");
    const btnMaterias = document.getElementById("link-materias");
    const btnSobre = document.getElementById("link-sobre");

    const allLinks = [btnInicio, btnMaterias, btnSobre];

    function trocarAba(abaVisivel, linkAtivo) {
        [abaCadastro, abaLista, abaSobre].forEach(function (aba) {
            aba.style.display = "none";
        });
        abaVisivel.style.display = "block";
        dica.style.display = (abaVisivel === abaSobre) ? "none" : "block";
        allLinks.forEach(function (l) { l.classList.remove("nav-ativo"); });
        if (linkAtivo) linkAtivo.classList.add("nav-ativo");
    }

    btnInicio.addEventListener("click", function (e) {
        e.preventDefault();
        trocarAba(abaCadastro, btnInicio);
    });

    btnSobre.addEventListener("click", function (e) {
        e.preventDefault();
        trocarAba(abaSobre, btnSobre);
    });

    btnMaterias.addEventListener("click", function (e) {
        e.preventDefault();
        trocarAba(abaLista, btnMaterias);
        exibirMaterias();
    });

    // Formulário de cadastro
    var form = document.getElementById("form-materia");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        var novaMateria = {
            nome: document.getElementById("materia").value.trim(),
            titulo: document.getElementById("titulo-conteudo").value.trim(),
            resumo: document.getElementById("resumo-materia").value.trim(),
            data: document.getElementById("data-limpa").value,
            timestamp: Date.now(),
            dataReferencia: document.getElementById("data-limpa").value,
            cicloAtual: 0,
            revisoes: []
        };

        try {
            await salvarMateria(novaMateria);
            mostrarNotificacao("Matéria salva com sucesso!", "sucesso");
            form.reset();
            btnMaterias.click();
        } catch (err) {
            mostrarNotificacao("Erro ao salvar: " + err, "erro");
        }
    });

    // Exibir matérias com status de esquecimento
    async function exibirMaterias() {
        var listaDiv = document.getElementById("lista-materias");
        try {
            var materias = await buscarMaterias();
            materias.sort(function (a, b) { return (b.timestamp || 0) - (a.timestamp || 0); });

            if (materias.length === 0) {
                listaDiv.innerHTML = '<p class="vazio">Nenhuma matéria salva ainda. Comece cadastrando!</p>';
                return;
            }

            listaDiv.innerHTML = "";
            materias.forEach(function (m) {
                if (m.cicloAtual === undefined) m.cicloAtual = 0;
                if (!m.dataReferencia) m.dataReferencia = m.data;
                if (!m.revisoes) m.revisoes = [];

                var status = calcularStatus(m);
                var dataBR = formatarData(m.data);
                var proximaRevisaoStr = status.proximaRevisao
                    ? status.proximaRevisao.toLocaleDateString("pt-BR")
                    : "—";

                var botoesHtml = "";
                if (status.cor !== "dominado") {
                    botoesHtml = '<button class="btn-revisao" data-id="' + m.id + '">Revisão Concluída</button>';
                } else {
                    botoesHtml = '<span class="dominado-label">Parabéns! Conteúdo dominado!</span>';
                }
                botoesHtml += ' <button class="btn-deletar" data-id="' + m.id + '">Excluir</button>';

                var proximaHtml = "";
                if (status.cor !== "dominado") {
                    proximaHtml = '<p class="proxima-revisao">Próxima revisão: <strong>' + proximaRevisaoStr + '</strong></p>';
                }

                var progressoHtml = criarBarraProgresso(m.cicloAtual);

                var card = document.createElement("div");
                card.className = "card-materia status-" + status.cor;
                card.innerHTML =
                    '<div class="card-header">' +
                        '<small>ESTUDADO EM: ' + dataBR + '</small>' +
                        '<span class="badge-status badge-' + status.cor + '">' + iconeCor(status.cor) + ' ' + textoStatus(status) + '</span>' +
                    '</div>' +
                    '<h3>' + escapeHtml(m.nome) + '</h3>' +
                    '<h4>Tópico: ' + escapeHtml(m.titulo) + '</h4>' +
                    '<p class="resumo-texto"><strong>Resumo:</strong><br>' + escapeHtml(m.resumo) + '</p>' +
                    progressoHtml +
                    proximaHtml +
                    '<div class="card-acoes">' + botoesHtml + '</div>';

                listaDiv.appendChild(card);
            });

            document.querySelectorAll(".btn-revisao").forEach(function (btn) {
                btn.addEventListener("click", async function () {
                    var id = Number(btn.dataset.id);
                    await marcarRevisao(id);
                });
            });

            document.querySelectorAll(".btn-deletar").forEach(function (btn) {
                btn.addEventListener("click", async function () {
                    var id = Number(btn.dataset.id);
                    if (confirm("Tem certeza que deseja excluir esta matéria?")) {
                        await deletarMateria(id);
                        mostrarNotificacao("Matéria excluída.", "sucesso");
                        exibirMaterias();
                    }
                });
            });

        } catch (err) {
            listaDiv.innerHTML = '<p class="vazio">Erro ao carregar matérias.</p>';
            console.error(err);
        }
    }

    async function marcarRevisao(id) {
        try {
            var materias = await buscarMaterias();
            var materia = materias.find(function (m) { return m.id === id; });
            if (!materia) return;

            materia.cicloAtual = (materia.cicloAtual || 0) + 1;
            var hoje = new Date();
            materia.dataReferencia = hoje.getFullYear() + "-" + String(hoje.getMonth() + 1).padStart(2, "0") + "-" + String(hoje.getDate()).padStart(2, "0");
            if (!materia.revisoes) materia.revisoes = [];
            materia.revisoes.push({
                data: new Date().toISOString(),
                ciclo: materia.cicloAtual
            });

            await atualizarMateria(materia);
            mostrarNotificacao("Revisão registrada! Continue assim!", "sucesso");
            exibirMaterias();
        } catch (err) {
            mostrarNotificacao("Erro ao registrar revisão: " + err, "erro");
        }
    }

    function criarBarraProgresso(cicloAtual) {
        var totalCiclos = 3;
        var progresso = Math.min(cicloAtual, totalCiclos);
        var porcentagem = Math.round((progresso / totalCiclos) * 100);
        var etapas = "";
        for (var i = 0; i < totalCiclos; i++) {
            var classe = i < progresso ? "etapa-concluida" : "etapa-pendente";
            var label = ["24h", "7d", "30d"][i];
            etapas += '<div class="etapa ' + classe + '">' + label + '</div>';
        }
        return '<div class="barra-progresso">' +
                   '<div class="progresso-label">Progresso: ' + porcentagem + '%</div>' +
                   '<div class="progresso-track">' +
                       '<div class="progresso-fill" style="width:' + porcentagem + '%"></div>' +
                   '</div>' +
                   '<div class="etapas">' + etapas + '</div>' +
               '</div>';
    }

    // Notificação visual (substitui alert)
    function mostrarNotificacao(mensagem, tipo) {
        var existente = document.querySelector(".notificacao");
        if (existente) existente.remove();

        var notif = document.createElement("div");
        notif.className = "notificacao notif-" + tipo;
        notif.textContent = mensagem;
        document.body.appendChild(notif);

        setTimeout(function () {
            notif.classList.add("notif-saindo");
            setTimeout(function () { notif.remove(); }, 400);
        }, 3000);
    }

    // Efeito hover na dica
    if (dica) {
        dica.addEventListener("mouseenter", function () {
            dica.style.backgroundColor = "#fff3cd";
            dica.style.cursor = "pointer";
        });
        dica.addEventListener("mouseleave", function () {
            dica.style.backgroundColor = "transparent";
        });
    }

    btnInicio.classList.add("nav-ativo");
});

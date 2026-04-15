window.addEventListener('load', () => {
    // 1. Elementos das Abas
    const abaCadastro = document.getElementById('aba-cadastro');
    const abaLista = document.getElementById('aba-lista');
    const abaSobre = document.getElementById('aba-sobre');
    const dica = document.getElementById('dica-especialista');

    // 2. Botões do Menu
    const btnInicio = document.getElementById('link-inicio');
    const btnMaterias = document.getElementById('link-materias');
    const btnSobre = document.getElementById('link-sobre');

    // Função para trocar de aba
    function trocarAba(abaVisivel) {
        [abaCadastro, abaLista, abaSobre].forEach(aba => aba.style.display = 'none');
        abaVisivel.style.display = 'block';
        dica.style.display = (abaVisivel === abaSobre) ? 'none' : 'block';
    }

    // Eventos de clique do Menu
    btnInicio.addEventListener('click', () => trocarAba(abaCadastro));
    btnSobre.addEventListener('click', () => trocarAba(abaSobre));
    btnMaterias.addEventListener('click', () => {
        trocarAba(abaLista);
        exibirMaterias(); // Carrega a lista sempre que clicar na aba
    });

    // 3. Lógica para Salvar Matéria
    const form = document.getElementById('form-materia');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const novaMateria = {
            nome: document.getElementById('materia').value,
            titulo: document.getElementById('titulo-conteudo').value,
            resumo: document.getElementById('resumo-materia').value,
            data: document.getElementById('data-limpa').value,
            timestamp: new Date(document.getElementById('data-limpa').value + "T00:00:00").getTime()
        };

        const transacao = db.transaction(["materias"], "readwrite");
        const store = transacao.objectStore("materias");
        
        store.add(novaMateria).onsuccess = () => {
            alert("✅ Matéria salva com sucesso!");
            form.reset();
            btnMaterias.click(); // Te leva direto para a lista após salvar
        };
    });

    // 4. A PARTE QUE VOCÊ PERGUNTOU: Onde os cards são gerados
    function exibirMaterias() {
        const listaDiv = document.getElementById('lista-materias');
        const store = db.transaction(["materias"], "readonly").objectStore("materias");
        
        store.getAll().onsuccess = (e) => {
            let materias = e.target.result;

            // Ordena por data (mais recente primeiro)
            materias.sort((a, b) => b.timestamp - a.timestamp);

            listaDiv.innerHTML = materias.length === 0 ? "<p>Nada salvo ainda. ✍️</p>" : "";

            // AQUI ESTÁ A PARTE DOS EMOJIS E DO HTML DOS CARDS
            materias.forEach(m => {
                const dataBR = new Date(m.data + "T00:00:00").toLocaleDateString('pt-BR');
                
                listaDiv.innerHTML += `
                    <div class="card-materia">
                        <small>📅 ESTUDADO EM: ${dataBR}</small>
                        <h3>📖 ${m.nome}</h3>
                        <h4>📌 Tópico: ${m.titulo}</h4>
                        <p>📝 <strong>Resumo:</strong><br>${m.resumo}</p>
                    </div>
                `;
            });
        };
    }
});
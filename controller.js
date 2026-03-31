// controller.js - Responsável pela lógica da tela
const form = document.getElementById("form-materia");
const listaDiv = document.getElementById("lista-materias");

// Função para mostrar as matérias na tela
async function renderizarLista() {
    const materias = await buscarTodos(); // Busca do db.js
    listaDiv.innerHTML = ""; // Limpa a lista antes de mostrar

    materias.forEach(item => {
        const itemHtml = `
            <div style="background: #eee; margin: 5px; padding: 10px; border-radius: 5px;">
                <strong>Livro/Matéria:</strong> ${item.materia} <br>
                <strong>Data:</strong> ${item.data}
            </div>
        `;
        listaDiv.innerHTML += itemHtml;
    });
}

// Evento de salvar o formulário
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        materia: document.getElementById("materia").value,
        data: document.getElementById("data").value
    };

    await salvarNoBanco(dados); // Salva no db.js
    form.reset();
    renderizarLista(); // Atualiza a tela
});

// Mostra os dados assim que abrir a página
window.onload = renderizarLista;
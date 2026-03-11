// 1. Selecionamos os elementos que vamos usar
const form = document.getElementById('form-materia');
const lista = document.getElementById('lista-materias');

// 2. Ouvimos o evento de "submit" (enviar) do formulário
form.addEventListener('submit', function(event) {
    // Impede a página de recarregar (comportamento padrão do formulário)
    event.preventDefault();

    // 3. Pegamos os valores digitados nos inputs
    const materia = document.getElementById('materia').value;
    const dataestudo = document.getElementById('data').value;

    // 4. Criamos um "card" (uma div) para exibir a matéria
    const novoCard = document.createElement('div');
    novoCard.classList.add('card-estudo'); // Adicionamos uma classe para estilizar no CSS depois

    // 5. Definimos o conteúdo do card (usando Template Strings)
    novoCard.innerHTML = `
        <p><strong>Matéria:</strong> ${materia}</p>
        <p><strong>Estudado em:</strong> ${dataestudo}</p>
        <p><em>💡 Dica: Revise isso amanhã!</em></p>
        <hr>
    `;

    // 6. Colocamos o novo card dentro da nossa lista no HTML
    lista.appendChild(novoCard);

    // 7. Limpamos o formulário para a próxima matéria
    form.reset();
});
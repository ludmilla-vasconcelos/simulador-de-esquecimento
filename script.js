// 1. Selecionamos os elementos do seu HTML (Apenas uma vez!)
const formulario = document.querySelector('#form-materia');
const campoMateria = document.querySelector('#materia');
const campoData = document.querySelector('#data'); // Pegando a data também!
const listaExibicao = document.querySelector('#lista-materias');

// 2. Criamos a "escuta" do evento (quando clica em Salvar)
formulario.addEventListener('submit', function(evento) {
    
    // Impede a página de recarregar sozinha
    evento.preventDefault();

    // 3. Pegamos o que foi digitado nos campos
    const nomeDaMateria = campoMateria.value;
    const dataEstudo = campoData.value;

    // 4. Cria um "Card" (uma div) para ficar bonito na tela
    const novoCard = document.createElement('div');
    
    // Adicionamos o conteúdo dentro desse card
    novoCard.innerHTML = `
        <div style="background-color: #f0f8ff; padding: 10px; margin-top: 10px; border-radius: 8px; border-left: 5px solid #007bff;">
            <p><strong>📚 Matéria:</strong> ${nomeDaMateria}</p>
            <p><strong>📅 Data:</strong> ${dataEstudo}</p>
            <p><small><em>Dica: Revise em 24 horas!</em></small></p>
        </div>
    `;
    
    // 5. Colocamos o card novo dentro da nossa lista no HTML
    listaExibicao.appendChild(novoCard);

    // 6. Limpamos o formulário para a próxima digitação
    formulario.reset();
});

// Teste de conexão (aparecerá no F12 -> Console)
console.log("O simulador de estudos está ativo! Feito por Lucas e Ludmilla.");
// SEGUNDA INTERAÇÃO: Mudar cor da dica ao passar o mouse
const dica = document.querySelector('article');

// Quando o mouse entra na área da dica
dica.addEventListener('mouseenter', function() {
    dica.style.backgroundColor = '#fff3cd'; // Fica amarelinho
    dica.style.cursor = 'pointer';
});

// Quando o mouse sai da área da dica
dica.addEventListener('mouseleave', function() {
    dica.style.backgroundColor = 'transparent'; // Volta ao normal
});
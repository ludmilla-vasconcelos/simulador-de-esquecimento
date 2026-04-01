// Espera a página carregar 100% para não dar erro de "null"
window.addEventListener('load', () => {

    const slider = document.getElementById('data-caos');
    const display = document.getElementById('data-display');
    const btn = document.getElementById('btn-fugitivo');
    const form = document.getElementById('form-materia');

    let dataFinal = "";

    // 1. Slider do Caos
    if (slider) {
        slider.addEventListener('input', () => {
            const data = new Date(parseInt(slider.value));
            dataFinal = data.toLocaleDateString('pt-BR');
            display.innerText = `Data Selecionada: ${dataFinal}`;
        });
    }

    // 2. Botão Fugitivo
    if (btn) {
        btn.addEventListener('mouseover', () => {
            const x = Math.random() * (window.innerWidth - 150);
            const y = Math.random() * (window.innerHeight - 50);
            
            btn.style.position = "fixed";
            btn.style.left = `${x}px`;
            btn.style.top = `${y}px`;
            btn.style.zIndex = "9999"; // Garante que ele fique por cima de tudo
        });
    }

    // 3. Salvar no IndexedDB
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const materiaNome = document.getElementById('materia').value;

            // Se o banco ainda não conectou, avisamos o usuário
            if (typeof db === 'undefined' || !db) {
                alert("O banco de dados ainda está iniciando. Tente novamente em 2 segundos.");
                return;
            }

            const transacao = db.transaction(["materias"], "readwrite");
            const store = transacao.objectStore("materias");

            const novaMateria = {
                nome: materiaNome,
                data: dataFinal,
                timestamp: new Date()
            };

            const pedido = store.add(novaMateria);

            pedido.onsuccess = () => {
                alert("VITÓRIA! Você salvou: " + materiaNome);
                location.reload();
            };
            
            pedido.onerror = () => {
                console.error("Erro ao salvar no banco.");
            };
        });
    }
});
// db.js - Responsável apenas por falar com o banco de dados
function abrirBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("SimuladorEsquecimentoDB", 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            // Cria a tabela 'estudos'
            db.createObjectStore("estudos", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Erro ao abrir banco");
    });
}

async function salvarNoBanco(dados) {
    const db = await abrirBanco();
    const tx = db.transaction("estudos", "readwrite");
    const store = tx.objectStore("estudos");
    store.add(dados);
    return tx.complete;
}

async function buscarTodos() {
    const db = await abrirBanco();
    return new Promise((resolve) => {
        const tx = db.transaction("estudos", "readonly");
        const store = tx.objectStore("estudos");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}
// db.js
let db;
// Abre o banco de dados "SimuladorEsquecimento"
const request = indexedDB.open("SimuladorEsquecimento", 1);

// Se for a primeira vez ou mudar a versão, cria a "tabela"
request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("materias")) {
        db.createObjectStore("materias", { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Banco de dados IndexedDB conectado com sucesso!");
};

request.onerror = (event) => {
    console.error("Erro no IndexedDB:", event.target.errorCode);
};
// db.js - Banco de dados IndexedDB para o Simulador de Esquecimento
let db;

function iniciarBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("SimuladorEsquecimento", 2);

        request.onupgradeneeded = (event) => {
            const banco = event.target.result;
            if (!banco.objectStoreNames.contains("materias")) {
                banco.createObjectStore("materias", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("Banco de dados conectado!");
            resolve(db);
        };

        request.onerror = (event) => {
            console.error("Erro no IndexedDB:", event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

function salvarMateria(dados) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(["materias"], "readwrite");
        const store = tx.objectStore("materias");
        const request = store.add(dados);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Erro ao salvar matéria");
    });
}

function buscarMaterias() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(["materias"], "readonly");
        const store = tx.objectStore("materias");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Erro ao buscar matérias");
    });
}

function atualizarMateria(dados) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(["materias"], "readwrite");
        const store = tx.objectStore("materias");
        const request = store.put(dados);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Erro ao atualizar matéria");
    });
}

function deletarMateria(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(["materias"], "readwrite");
        const store = tx.objectStore("materias");
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Erro ao deletar matéria");
    });
}

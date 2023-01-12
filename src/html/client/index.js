const socket = io();
const documentList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputNewDocument = document.getElementById('input-documento');

function insertNewDocument(documentName) {
    const newDocument = `<a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action">${documentName}</a>`
    documentList.innerHTML += newDocument;
}

socket.emit('getDocuments', (documents) => {
    for (const document of documents) {
        insertNewDocument(document.name);
    };
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('createNewDocument', inputNewDocument.value, (error) => {
        console.log(error)
        alert(error);
    });
    inputNewDocument.value = '';
});
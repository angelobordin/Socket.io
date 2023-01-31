const socket = io();
const documentList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputNewDocument = document.getElementById('input-documento');

socket.emit('getDocumentList', (documents) => {
    if (!documents) return;
    for (const document of documents) {
        insertNewDocument(document.name);
    };
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('createNewDocument', inputNewDocument.value, (error) => {
        alert(error);
        window.location.href = '/';
    });
    inputNewDocument.value = '';
});

socket.on('newDocument', (newDocumentName) => {
    insertNewDocument(newDocumentName);
});

function insertNewDocument(documentName) {
    const newDocument = `<a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action" id="document-${documentName}">${documentName}</a>`
    documentList.innerHTML += newDocument;
}

function removeDocumentDeleted(name) {
    const documentDeleted = document.getElementById(`document-${name}`);
    documentList.removeChild(documentDeleted);
}

export { insertNewDocument, removeDocumentDeleted };
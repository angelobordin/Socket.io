import { DocumentFunctions } from "./document/DocumentFunctions.js";

const form = document.getElementById('form-adiciona-documento');
const documentList = document.getElementById('lista-documentos');
const inputNewDocument = document.getElementById('input-documento');
const documentFunctions = new DocumentFunctions(documentList);

documentFunctions.getDocumentList();
documentFunctions.listenNewDocument();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    documentFunctions.createNewDocument(inputNewDocument)
    inputNewDocument.value = '';
});

// function removeDocumentDeleted(name) {
//     const documentDeleted = document.getElementById(`document-${name}`);
//     documentList.removeChild(documentDeleted);
// }
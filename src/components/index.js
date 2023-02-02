import { DocumentFunctions } from "./document/DocumentFunctions.js";
// import { GenericFunctions } from '../server/utils/GenericFunctions.js';

const form = document.getElementById('form-adiciona-documento');
const documentList = document.getElementById('lista-documentos');
const inputNewDocument = document.getElementById('input-documento');
const documentFunctions = new DocumentFunctions(documentList);
const btnLogout = document.getElementById('botao-logout');
// const tokenJwt = GenericFunctions.getCookie('tokenJwt');

documentFunctions.getDocumentList();
documentFunctions.listenNewDocument();

btnLogout.addEventListener('click', () => {
    // GenericFunctions.cleanCookie('tokenJwt');
    alert('Usuer logout sucessfully!');
    window.location.href = '/login/index.html';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    documentFunctions.createNewDocument(inputNewDocument)
    inputNewDocument.value = '';
});

// function removeDocumentDeleted(name) {
//     const documentDeleted = document.getElementById(`document-${name}`);
//     documentList.removeChild(documentDeleted);
// }
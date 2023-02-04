import { DocumentFunctions } from "./document/DocumentFunctions.js";

const form = document.getElementById('form-adiciona-documento');
const documentList = document.getElementById('lista-documentos');
const inputNewDocument = document.getElementById('input-documento');
const documentFunctions = new DocumentFunctions(documentList);
const btnLogout = document.getElementById('botao-logout');
const tokenJwt = document.cookie.split('; ').find((cookie) => cookie.startsWith(`tokenJwt=`))?.split('=')[1];

const socket = io('/usuarios',{
    auth: {
        token: tokenJwt
    }
});

documentFunctions.getDocumentList();
documentFunctions.listenNewDocument();

btnLogout.addEventListener('click', () => {
    document.cookie = `tokenJwt=; expires=Thu, 01 Jan 1970 00:00:00`;
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
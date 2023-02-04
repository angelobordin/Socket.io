import { DocumentFunctions } from "./DocumentFunctions.js";

const socket = io('/usuarios',{
    auth: {
        token: tokenJwt
    }
});

const textDocumentSelected = document.getElementById('editor-texto');
const title = document.getElementById('titulo-documento');
const btnExcluir = document.getElementById('excluir-documento');

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get('nome');

title.textContent = documentName || "Documento Sem Titulo";

const documentFunctions = new DocumentFunctions();

documentFunctions.connectError();
socket.emit('getDocumentSelected', documentName, (textDocument) => {textDocumentSelected.value = textDocument});

btnExcluir.addEventListener('click', () => {
    documentFunctions.deleteDocument(documentName);
});

textDocumentSelected.addEventListener('keyup', () => {
    const data = { 
        text: textDocumentSelected.value, 
        name: documentName
    };

    documentFunctions.updateDocumentText(data);
});

socket.on('updateDocumentText', (text) => {textDocumentSelected.value = text;});

import { removeDocumentDeleted } from "./index.js";

const socket = io();
const textDocumentSelected = document.getElementById('editor-texto');
const title = document.getElementById('titulo-documento');
const btnExcluir = document.getElementById('excluir-documento');

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get('nome');
title.textContent = documentName || "Documento Sem Titulo";

socket.emit('getDocumentSelected', documentName, (textDocument) => {textDocumentSelected.value = textDocument});

btnExcluir.addEventListener('click', () => {
    socket.emit('deleteDocument', documentName, (windowRefresh) => {
        if (!windowRefresh) return alert(`Error in delete operation!`);

        // removeDocumentDeleted(documentName);
        window.location.href = '/'
        alert(`Document ${documentName} deleted sucessful`);
    });
})

textDocumentSelected.addEventListener('keyup', () => {
    const data = { 
        text: textDocumentSelected.value, 
        name: documentName
    };

    socket.emit('updateDocumentText', data);
});

socket.on('updateDocumentText', (text) => {
    textDocumentSelected.value = text;
});
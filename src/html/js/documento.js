const socket = io();

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get('nome');

const textArea = document.getElementById('editor-texto');
const title = document.getElementById('titulo-documento');
title.textContent = documentName || "Documento Sem Titulo";

socket.emit('Selected_Document', documentName);

textArea.addEventListener('keyup', () => {
    socket.emit('text', { text: textArea.value, name: documentName});
});

socket.on('text_for_client', (text) => {
    textArea.value = text;
});

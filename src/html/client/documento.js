const socket = io();

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get('nome');

const textArea = document.getElementById('editor-texto');

const title = document.getElementById('titulo-documento');
title.textContent = documentName || "Documento Sem Titulo";

socket.emit('Selected_Document', documentName, (textDefault) => {textArea.value = textDefault});

textArea.addEventListener('keyup', () => {
    const data = { 
        text: textArea.value, 
        name: documentName
    };

    socket.emit('text_for_client', data);
});

socket.on('text_for_client', (text) => {
    textArea.value = text;
});
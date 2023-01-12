const socket = io();
const textArea = document.getElementById('editor-texto');
const title = document.getElementById('titulo-documento');
const btnExcluir = document.getElementById('excluir-documento');

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get('nome');
title.textContent = documentName || "Documento Sem Titulo";

socket.emit('Selected_Document', documentName, (textDefault) => {textArea.value = textDefault});

btnExcluir.addEventListener('click', () => {
    socket.emit('deleteDocument', documentName, (windowRefresh, name) => {
        console.log(windowRefresh, name);
        // if (windowRefresh) window.location.href = '/';
        // alert(`Document ${name} deleted sucessful`);
    });
})

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
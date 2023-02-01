import DocumentService from '../services/DocumentService.js';

function DocumentController(socket, io) {
    socket.on('getDocumentList', async (returnList) => {
        const documents = await DocumentService.getDocumentList();
        returnList(documents);
    });

    socket.on('getDocumentSelected', async (documentName, returnText) => {
        socket.join(documentName);
        const documentSelected = await DocumentService.findDocument(documentName);

        if (documentSelected) returnText(documentSelected.text);
    });

    socket.on('createNewDocument', async (newDocumentName, eventError) => {
        const duplicated = await DocumentService.findDocument(newDocumentName) ?? '';
        if (duplicated) return eventError(`The document ${newDocumentName} already exists!`);

        const newDocument = await DocumentService.createNewDocument(newDocumentName);
        if (newDocument.acknowledged) io.emit('newDocument', newDocumentName);
    });

    socket.on('deleteDocument', async (documentName, windowRefresh) => {
        const result = await DocumentService.deleteDocument(documentName) ?? '';
        windowRefresh(result.deletedCount ? true : false);
    })

    socket.on('updateDocumentText', async (data) => {
        const document = await DocumentService.updateDocument(data.name, data.text);

        if (document.modifiedCount) {
            socket.to(data.name).emit('updateDocumentText', data.text);
        }
    });
};

export default DocumentController;
import io from './server.js';
import DocumentService from './services/DocumentService.js';

io.on("connection", (server) => {        
    server.on('getDocumentList', async (returnList) => {
        const documents = await DocumentService.getDocumentList();
        returnList(documents);
    });

    server.on('getDocumentSelected', async (documentName, returnText) => {
        server.join(documentName);
        const documentSelected = await DocumentService.findDocument(documentName);

        if (documentSelected) returnText(documentSelected.text);
    });

    server.on('createNewDocument', async (newDocumentName, eventError) => {
        const duplicated = await DocumentService.findDocument(newDocumentName) ?? '';
        if (duplicated) return eventError(`The document ${newDocumentName} already exists!`);

        const newDocument = await DocumentService.createNewDocument(newDocumentName);
        if (newDocument.acknowledged) io.emit('newDocument', newDocumentName);
    });

    server.on('deleteDocument', async (documentName, windowRefresh) => {
        const result = await DocumentService.deleteDocument(documentName) ?? '';
        windowRefresh(result.deletedCount ? true : false);
    })


    server.on('updateDocumentText', async (data) => {
        const document = await DocumentService.updateDocument(data.name, data.text);

        if (document.modifiedCount) {
            server.to(data.name).emit('updateDocumentText', data.text);
        }
    });

});

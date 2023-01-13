import io from './server.js';
import Service from './service.js';

io.on("connection", (server) => {        
    server.on('getDocumentList', async (returnList) => {
        const documents = await Service.getDocumentList();
        returnList(documents);
    });

    server.on('getDocumentSelected', async (documentName, returnText) => {
        server.join(documentName);
        const documentSelected = await Service.findDocument(documentName);

        if (documentSelected) returnText(documentSelected.text);
    });

    server.on('createNewDocument', async (newDocumentName, eventError) => {
        const duplicated = await Service.findDocument(newDocumentName) ?? '';
        if (duplicated) return eventError(`The document ${newDocumentName} already exists!`);

        const newDocument = await Service.createNewDocument(newDocumentName);
        if (newDocument.acknowledged) io.emit('newDocument', newDocumentName);
    });

    server.on('deleteDocument', async (documentName, windowRefresh) => {
        const result = await Service.deleteDocument(documentName) ?? '';
        windowRefresh(result.deletedCount ? true : false);
    })


    server.on('updateDocumentText', async (data) => {
        const document = await Service.updateDocument(data.name, data.text);

        if (document.modifiedCount) {
            server.to(data.name).emit('updateDocumentText', data.text);
        }
    });

});

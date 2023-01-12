import io from './server.js';
import Service from './service.js';

io.on("connection", (client) => {
    console.log(`Client connected! ID: ${client.id}`);

    client.on('getDocuments', async (returnList) => {
        const documents = await Service.getDocumentList();

        returnList(documents);
    });

    client.on('createNewDocument', async (newDocumentName, eventError) => {
        const duplicated = await Service.findDocument(newDocumentName) ?? '';
        if (duplicated) return eventError(`The document ${newDocumentName} already exists!`);

        await Service.createNewDocument(newDocumentName);
    });

    client.on('deleteDocument', async (documentName, windowRefresh) => {
        const result = await Service.deleteDocument(documentName) ?? '';
        if (result) return windowRefresh(true, documentName);
    })
    
    client.on('Selected_Document', async (documentName, returnTextDefault) => {
        client.join(documentName);

        const textDefault = await Service.findDocument(documentName);

        if (textDefault) returnTextDefault(textDefault.text);
    });

    client.on('text_for_client', async (data) => {
        const document = await Service.updateDocument(data.name, data.text);

        if (document.modifiedCount) {
            client.to(data.name).emit('text_for_client', data.text);
        }
    });

});

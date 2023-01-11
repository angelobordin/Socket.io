import io from './server.js';
import Service from './service.js';

io.on("connection", (client) => {
    console.log(`Client connected! ID: ${client.id}`)
    
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

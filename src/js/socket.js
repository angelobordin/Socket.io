import io from './server.js';

const documents = [
    {
        name: "JavaScript",
        text: "Texto de javascript..."
    }, {
        name: "Node",
        text: "Texto de Node..."
    }, {
        name: "Socket.io",
        text: "Texto de Socket.Io..."
    }
];

io.on("connection", (client) => {
    console.log(`Client connected! ID: ${client.id}`)
    
    client.on('Selected_Document', (documentName, returnTextDefault) => {
        client.join(documentName);
        const textDefault = findDocument(documentName);

        if (textDefault) returnTextDefault(textDefault.text);
    });

    client.on('text_for_client', (data) => {
        const document = findDocument(data.name);
    
        if (document) {
            document.text = data.text;
        }
        client.to(data.name).emit('text_for_client', data.text);
    });

});

function findDocument(documentName) {
    const result = documents.find((document) => {
        return document.name === documentName;
    });
    return result;
}
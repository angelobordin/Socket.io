import io from './server.js';

io.on("connection", (client) => {
    console.log(`Client connected! ID: ${client.id}`)
    
    client.on('Selected_Document', (documentName) => {
        client.join(documentName);
    });

    client.on('text', (data) => {
        // socket.broadcast.emit('textJS_for_client', text);

        client.to(data.name).emit('text_for_client', data.text);
    });

});

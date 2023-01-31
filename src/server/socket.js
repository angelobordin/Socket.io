import io from './server.js';
import { DocumentController } from './controllers/DocumentController.js';
import { UserController } from './controllers/UserController.js';

io.on("connection", (socket) => {
    DocumentController(socket, io);
    UserController(socket, io);
});

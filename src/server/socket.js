import io from './server.js';
import DocumentController from './controllers/DocumentController.js';
import UserController from './controllers/UserController.js';
import LoginController from './controllers/LoginController.js';
import { GenericFunctions } from './utils/GenericFunctions.js';

io.on("connection", (socket) => {
    DocumentController(socket, io);
    UserController(socket, io);
    LoginController(socket, io);
});

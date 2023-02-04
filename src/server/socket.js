import 'dotenv/config';
import io from './server.js';
import DocumentController from './controllers/DocumentController.js';
import UserController from './controllers/UserController.js';
import LoginController from './controllers/LoginController.js';
import autorizeUser from './middlewares/autorizeUser.js';

const nspUser = io.of('/usuarios');

nspUser.use(autorizeUser);

nspUser.on('connection', (socket) => {
    DocumentController(socket, nspUser);
});

io.of('/').on("connection", (socket) => {
    UserController(socket, io);
    LoginController(socket, io);
});

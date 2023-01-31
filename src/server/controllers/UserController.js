import { UserService } from '../services/UserService.js';

function UserController(socket, io) {
    socket.on('registerNewUser', async (data) => {
        const userAlreadyExists = await UserService.getUserByName(data.userName);

        if (userAlreadyExists) return userRegisterReturn(socket, `User ${data.userName} already registered!`);

        const result = await UserService.registerNewUser(data);
        if (result.acknowledged) {
            userRegisterReturn(socket, `User ${data.userName} registered sucessful`);
        } else {
            userAlreadyExists(`Error on register`);
        };
    });
};

function userRegisterReturn(socket, message) {
    socket.emit('userRegisterReturn', message);
};

export { UserController };
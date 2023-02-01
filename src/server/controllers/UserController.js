import {UserService} from '../services/UserService.js';
import { GenericFunctions } from '../utils/GenericFunctions.js';

function UserController(socket, io) {
    socket.on('registerNewUser', async (data) => {
        const userAlreadyExists = await UserService.getUserByName(data.userName);

        if (userAlreadyExists) return GenericFunctions.userReturnMessage(socket, `User ${data.userName} already registered!`);

        const result = await UserService.registerNewUser(data);
        if (result.acknowledged) {
            GenericFunctions.userReturnMessage(socket, `User ${data.userName} successfully registered!`);
        } else {
            GenericFunctions.userReturnMessage(socket, `Error on register`);
        };
    });
};

export default UserController;
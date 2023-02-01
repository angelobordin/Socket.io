import {UserService} from '../services/UserService.js';
import { GenericFunctions } from '../utils/GenericFunctions.js';

function LoginController(socket, io) {
    socket.on('authUser', async (userData) => {
        const user = await UserService.getUserByName(userData.userName);

        if (!user) return GenericFunctions.userReturnMessage(socket, `User not found`);

        const auth = UserService.authUser(userData.password, user);
        socket.emit('authUserReturn', auth ? true : false );
    });
};

export default LoginController;
import {UserService} from '../services/UserService.js';
import { GenericFunctions } from '../utils/GenericFunctions.js';

function LoginController(socket, io) {
    socket.on('authUser', async (userData) => {
        const user = await UserService.getUserByName(userData.userName);

        if (!user) return GenericFunctions.userReturnMessage(socket, `User not found`);

        const wasAuthenticated = UserService.authUser(userData.password, user);
        if (wasAuthenticated) {
            const token = GenericFunctions.generateJWt({ name: userData.userName });
            socket.emit('authUserReturn', ({wasAuthenticated, token}) );
        };
        socket.emit('authUserReturn', ({wasAuthenticated, token: null}));
    });
};

export default LoginController;

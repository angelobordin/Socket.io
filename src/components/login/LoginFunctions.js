import { FrontGenericFunctions } from "../utils/FrontGenericFunctions.js";

const socket = io();

class LoginFunctions {
    authUser(userData) {
        socket.emit('authUser', userData);
    };

    listenAuthUser() {
        socket.on('authUserReturn', ({wasAuthenticated, token}) => {
            if (!wasAuthenticated) return alert('User password is incorrect');
            FrontGenericFunctions.toDefineCookie("tokenJwt", token);
            window.location.href = '/';
        });
    };

    listenUserReturnMessage() {
        socket.on('userReturnMessage', (message) => {
            alert(message);
        });
    };
}

export { LoginFunctions };

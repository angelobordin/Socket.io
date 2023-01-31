const socket = io();

class LoginFunctions {

    authUser(userData) {
        socket.emit('authUser', userData);
    };
}

export { LoginFunctions };
const socket = io();

class LoginFunctions {

    authUser(userData) {
        socket.emit('authUser', userData);
    };

    listenAuthUser() {
        socket.on('authUserReturn', (auth) => {
            if (!auth) return alert('User password is incorrect');
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

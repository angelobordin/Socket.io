const socket = io();

class LoginFunctions {
    authUser(userData) {
        socket.emit('authUser', userData);
    };

    listenAuthUser() {
        socket.on('authUserReturn', ({wasAuthenticated, token}) => {
            if (!wasAuthenticated) return alert('User password is incorrect');
            document.cookie = `tokenJwt=${token};path=/`
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

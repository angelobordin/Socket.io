const socket = io();

class RegistrationFunctions {

    constructor() {}

    registerNewUser(userData) {
        if (!userData) throw new Error(`User infos is missing!`);
        socket.emit('registerNewUser', userData);
    };

    listenUserRegisterReturn() {
        socket.on('userRegisterReturn', (message) => {
            alert(message);
        });
    };
};

export { RegistrationFunctions };

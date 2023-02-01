import { randomBytes, scryptSync } from 'crypto';

class GenericFunctions {
    static generateHashPassword(password) {
        const saltPassword = randomBytes(16).toString('hex');
        const hashPassword = scryptSync(password, saltPassword, 64).toString('hex');

        return {
            saltPassword,
            hashPassword
        };
    };

    static userReturnMessage(socket, message) {
        socket.emit('userReturnMessage', message);
    };
};

export { GenericFunctions };
import { randomBytes, scryptSync } from 'crypto';
import Jwt from 'jsonwebtoken';

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

    static generateJWt(userName) {
        const tokenJWT = Jwt.sign(userName, process.env.SECRET_TOKEN_JWT, { expiresIn: '1h' });
        return tokenJWT;
    };
};

export { GenericFunctions };
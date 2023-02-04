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

    // static toDefineCookie(chave, valor) {
    //     document.cookie = `${chave}=${valor};path=/`
    // };

    // static getCookie(chave) {
    //     return document.cookie.split('; ').find((cookie) => cookie.startsWith(`${chave}=`))?.split('=')[1];
    // };

    // static cleanCookie(chave) {
    //     document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
    // };
};

export { GenericFunctions };
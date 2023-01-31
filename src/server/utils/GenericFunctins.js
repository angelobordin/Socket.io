import { randomBytes, scryptSync } from 'crypto';

class Utils {
    static generateHashPassword(password) {
        const saltPassword = randomBytes(16).toString('hex');
        const hashPassword = scryptSync(password, saltPassword, 64).toString('hex');

        return {
            saltPassword,
            hashPassword
        };
    };
};

export { Utils };
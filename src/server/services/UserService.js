import { userCollection } from "../db/MongoConnection.js";
import { GenericFunctions } from "../utils/GenericFunctions.js";
import { scryptSync, timingSafeEqual } from 'crypto';

class UserService {
    static getUserByName(name) {
        try {
            if (!name) throw new Error(`name is missing!`);

            return userCollection.findOne({name});
        } catch (error) {
            throw new Error(error);
        };
    };

    static registerNewUser(userData) {
        try {
            if(!userData) throw new Error(`UserData is missing`);

            const { hashPassword, saltPassword } = GenericFunctions.generateHashPassword(userData.password);

            return userCollection.insertOne({
                name: userData.userName,
                password: hashPassword,
                saltPassword
            });         
        } catch (error) {
            throw new Error(error);
        };
    };

    static authUser(passwordLogin, user) {
        try {
            if (!user) throw new Error(`UserData is missing!`);
            if (!passwordLogin) throw new Error(`Password is missing!`);

            const temporaryPasswordHash = scryptSync(passwordLogin, user.saltPassword, 64);
            const realPasswordHash = Buffer.from(user.password, 'hex');
            const auth = timingSafeEqual(temporaryPasswordHash, realPasswordHash);

            return auth;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export { UserService };

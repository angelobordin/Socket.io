import { userCollection } from "../db/MongoConnection.js";
import { Utils } from "../utils/GenericFunctins.js";

class UserService {

    static getUserByName(name) {
        try {
            return userCollection.findOne({name});
        } catch (error) {
            throw new Error(error);
        };
    };

    static registerNewUser(userData) {
        try {
            const { hashPassword, saltPassword } = Utils.generateHashPassword(userData.password);

            return userCollection.insertOne({
                name: userData.userName,
                password: hashPassword,
                saltPassword
            });         
        } catch (error) {
            throw new Error(error);
        };
    };
};

export { UserService };

import { documentCollection } from './dbConnection.js';

class Service {    
    static async findDocument(documentName) {
        try {
            const result = await documentCollection.findOne({name: documentName});
            return result;   
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updateDocument(documentName, text) {
        try {
            const result = await documentCollection.updateOne({name: documentName}, {
                $set: {
                    text
                }
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Service;
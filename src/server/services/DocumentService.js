import { documentCollection } from './dbConnection.js.js';

class DocumentService {    
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

    static async getDocumentList() {
        try {
            const documents = documentCollection.find().toArray();
            return documents;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createNewDocument(name) {
        try {
            const result = await documentCollection.insertOne({
                name,
                text: null
            })

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteDocument(documentName) {
        try {
            const result = await documentCollection.deleteOne({
                name: documentName
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default DocumentService;
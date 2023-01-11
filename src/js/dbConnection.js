import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb+srv://admin:admin@websocketdb.ry7h9e9.mongodb.net/?retryWrites=true&w=majority');
let documentCollection;

try {
    await client.connect();
    const db = client.db('WebSocketDB');
    documentCollection = db.collection('documentos');

    console.log('Connected with DataBase sucessful!');
} catch (error) {
    throw new Error(error);
}

export { documentCollection };
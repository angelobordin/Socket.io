import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb+srv://admin:admin@websocketdb.ry7h9e9.mongodb.net/?retryWrites=true&w=majority');
let documentCollection, userCollection;

try {
    await client.connect();

    const db = client.db("websockets");
    documentCollection = db.collection("documents");
    userCollection = db.collection("user");

    console.log('Connected with DataBase sucessful!');
} catch (error) {
    throw new Error(error);
}

export { documentCollection, userCollection };
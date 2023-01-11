import express from "express";
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from "socket.io";
import "./dbConnection.js";

const app = express();
const port = process.env.port || 3000;

const urlActual = url.fileURLToPath(import.meta.url);
const directory = path.join(urlActual, '../..', 'html');
app.use(express.static(directory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`Server running in port ${port}`));

const io = new Server(httpServer);

export default io;
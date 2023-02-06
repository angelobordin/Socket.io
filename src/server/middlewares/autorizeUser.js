import jwt from "jsonwebtoken";

function autorizeUser(socket, next) {
    try {
        const tokenJWT = socket.handshake.auth.token;
        const userName = jwt.verify(tokenJWT, process.env.SECRET_TOKEN_JWT);
        socket.emit('userAuthenticated', userName);
        next();
    } catch (error) {
        next(error);
    }
};

export default autorizeUser;
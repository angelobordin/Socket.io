import jwt from "jsonwebtoken";

function autorizeUser(socket, next) {
    try {
        const tokenJWT = socket.handshake.auth.token;
        jwt.verify(tokenJWT, process.env.SECRET_TOKEN_JWT);
        next();
    } catch (error) {
        next(error);
    }
};

export default autorizeUser;
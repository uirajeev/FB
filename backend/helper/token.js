import jwt from 'jsonwebtoken';

export const generateToken = (payload, expire) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: expire,
    });
}
import jwt from 'jsonwebtoken';
import userSchema from '../models/user.model.js';

export const getAccessToken = (request) => {
    const tokenHeader = request.headers['authorization'];
    const token = tokenHeader.split(' ')[1];

    return token;
} 

export const getUser = async (request) => {
    const token = getAccessToken(request);

    jwt.verify(token, process.env.TEACHER_ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
        } else {
            const tokenUser = decode['user'];
            userSchema.findOne({ userId: tokenUser.userId }, function (err, result) {
                if (err) {
                    res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
                } else {
                    return result;
                }
            });
        }
    });
}

export const createAcessToken = (user_) => {
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    return token;
}

export const createRefreshToken = (user_) => {
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        },
        tokenVersion: user_.tokenVersion
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return token;
}

export const createTeacherAccessToken = (user_) => {
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        }
    }, process.env.TEACHER_ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

    return token;
}

export const createTeacherRefreshToken = (user_) => {
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        },
        tokenVersion: user_.tokenVersion
    }, process.env.TEACHER_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return token;
}
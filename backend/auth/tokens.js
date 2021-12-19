// ####
// Hvordan vores tokens bliver generetet
// Læs om hvordan de viker på linje 69
// ####

import jwt from 'jsonwebtoken';
import userSchema from '../models/user.model.js';

export const getAccessToken = (request) => {
    const tokenHeader = request.headers['authorization'];
    const token = tokenHeader.split(' ')[1];

    return token;
} 

export const getTeacher = async (request) => {
    const token = getAccessToken(request);
    
    try {
        const tokenUser = await jwt.verify(token, process.env.TEACHER_ACCESS_TOKEN_SECRET).user;
        const user = await userSchema.findOne({ userId: tokenUser.userId }).exec();
        return user;
    } catch (error) {
        res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
    }
}

export const getStudent = async (request) => {
    const token = getAccessToken(request);
    
    try {
        const tokenUser = await jwt.verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRET).user;
        const user = await userSchema.findOne({ userId: tokenUser.userId }).exec();
        return user;
    } catch (error) {
        res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
    }
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

// #### Student ####

// Generer access token til elever
export const createStudentAccessToken = (user_) => {
    // Bruger jwt til at lave en token, med given payload (indhold)
    // Indhold er om brugeren
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        }
    }, process.env.STUDENT_ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
    // process.env.STUDENT_ACCESS_TOKEN_SECRET = _
    //      henter secret key fra fil kun serveren kan læse
    // STUDENT_ACCESS_TOKEN_SECRET er et environment variable
    // token er gylig i 2 timer

    return token;
}

export const createStudentRefreshToken = (user_) => {
    const token = jwt.sign({
        user: {
            userId: user_.userId,
            firstname: user_.firstname,
            lastname: user_.lastname,
            profileType: user_.profileType
        },
        tokenVersion: user_.tokenVersion
    }, process.env.STUDENT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return token;
}

// #### Teacher ####

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
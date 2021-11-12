import jwt from 'jsonwebtoken';

export const getAccessToken = (request) => {
    const tokenHeader = request.headers['authorization'];
    const token = tokenHeader.split(' ')[1];

    return token;
} 

export const createAcessToken = (user_) => {
    const token = jwt.sign({
        user: {
            email: user_.email,
            firstName: user_.firstName,
            lastName: user_.lastName
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    return token;
}

export const createRefreshToken = (user_) => {
    const token = jwt.sign({
        user: {
            email: user_.email,
            firstName: user_.firstName,
            lastName: user_.lastName
        },
        tokenVersion: user_.tokenVersion
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return token;
}

export const createTeacherAccessToken = (user_) => {
    const token = jwt.sign({
        user: {
            email: user_.email,
            firstName: user_.firstName,
            lastName: user_.lastName
        }
    }, process.env.TEACHER_ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

    return token;
}

export const createTeacherRefreshToken = (user_) => {
    const token = jwt.sign({
        user: {
            email: user_.email,
            firstName: user_.firstName,
            lastName: user_.lastName
        },
        tokenVersion: user_.tokenVersion
    }, process.env.TEACHER_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return token;
}
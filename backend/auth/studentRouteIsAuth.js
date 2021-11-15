import jwt from 'jsonwebtoken';

export const studentRouteIsAuth = (req, res, next) => {
    const auth = req.headers['authorization'];
    
    // bearer
    if (!auth) {
        res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'authorization not found' });
    } else {
        const token = auth.split(' ')[1];
        
        try {
            jwt.verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'Token error' });
                }
                next();
            });
        } catch (error) {
            res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'Try error' });
        }
    }
}
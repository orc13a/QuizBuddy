// ####
// Denne type fil er til at sikre nogen endpoints
// Det er endpoints som man skal være logget ind for at kunne få adgang til, det vil sige man skal have en gylig token
// ####

import jwt from 'jsonwebtoken';

//                                 👇    👇 Sendes fra endpoint, hvor man kalder denne funktion
export const teacherRouteIsAuth = (req, res, next) => {
    //         Er gå vidre til endpoints kode 👆

    // Få token fra requestens headers, http headers
    const auth = req.headers['authorization'];
    
    // bearer
    if (!auth) {
        res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'authorization not found' });
    } else {
        // Fra skild bearer og selve token fra hinanden
        const token = auth.split(' ')[1];
        
        try {
            // Bruger jwt til at se om token er gyldig
            //                |-----------------👇-------------------| Bruger vores secret fra vores environment variable
            jwt.verify(token, process.env.TEACHER_ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'Token error' });
                }
                next(); // Gå videre til endpoints kode
            });
        } catch (error) {
            res.status(401).json({ message: 'Du skal være logget ind', type: 'error', errorMessage: 'Try error' });
        }
    }
}
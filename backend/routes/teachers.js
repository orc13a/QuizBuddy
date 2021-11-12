import express from 'express';
const api = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createTeacherAccessToken, createTeacherRefreshToken, getAccessToken } from '../auth/tokens.js';
import { sendRefreshToken } from '../auth/sendRefreshToken.js';
// import { routeIsAuth } from '../auth/routeIsAuth.js';

// ----------------------------------------
// GET requests
// ----------------------------------------

// api.get('/details', routeIsAuth, (req, res) => {
//     const token = getAccessToken(req);

//     jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decode) => {
//         if (err) {
//             console.log(err);
//             res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
//         } else {
//             const tokenUser = decode['user'];

//             db.query('SELECT username, firstname, lastname FROM admins WHERE id = ?;', [tokenUser.userId], (err, result) => {
//                 if (err) {
//                     res.status(403).json({ message: 'Der skete en fejl', type: 'error' });
//                 }
//                 const user = result[0];
//                 res.status(200).json({ user, type: 'success' });
//             });
//         }
//     });
// });

// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/login', (req, res) => {
    // db.query(`SELECT * from admins WHERE username = ?;`, [req.body.username], (err, result) => {
    //     if (err || result.length === 0) {
    //         console.log(err);
    //         res.status(404).json({message: 'Bruger ikke fundet', type: 'error'});
    //     } else {
    //         const user = result[0]; // Get user obj
    //         const hashPwd = user.password;

    //         // Compare password input and users password
    //         bcrypt.compare(req.body.password, hashPwd, function(err, result) {
    //             if (err) {
    //                 console.log(err);
    //                 res.status(400).json({message: 'Der skete en fejl, prøv igen', type: 'warning'});
    //             }

    //             // User found && password matches
    //             if (result === true) {
    //                 const aToken = createAdminAccessToken(user);
    //                 const rToken = createAdminRefreshToken(user);

    //                 sendRefreshToken(res, rToken);
    //                 res.status(200).json({ gid: aToken });
    //             } else { // User found && password matche error
    //                 res.status(406).json({message: 'Forkert brugernavn eller adgagnskode', type: 'error'});
    //             }
    //         });
    //     }
    // });
});

// api.post('/logout', routeIsAuth, (req, res) => {
//     sendRefreshToken(res, '');
//     res.status(200).json({ message: 'admin been logged out', type: 'success' });
// });

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
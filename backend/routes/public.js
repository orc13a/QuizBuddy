import express from 'express';
const api = express.Router();
import bcrypt from 'bcrypt';
const saltRounds = 13;
import getUuid from 'uuid-by-string';

import userSchema from '../models/user.model.js';
import { createTeacherAccessToken, createTeacherRefreshToken } from '../auth/tokens.js';
import { sendRefreshToken } from '../auth/sendRefreshToken.js';
import { getUserAvatar } from '../functions/getUserAvatar.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/signup', async (req, res) => {
    const userSignup = req.body;

    const findUser = await userSchema.findOne({ email: userSignup.email });

    if (findUser !== null) {
        res.status(406).json({ message: 'E-mail allerede i brug', type: 'error' });
    } else if (userSignup.passwordRepeat !== userSignup.password) {
        res.status(400).json({ message: 'Adgangskoderne er ikke ens', type: 'error' });
    } else {
        const newUser = {
            userId: getUuid(userSignup.email),
            profileType: userSignup.profileType,
            firstname: userSignup.firstname,
            lastname: userSignup.lastname,
            email: userSignup.email,
            password: '',
            tokenVersion: 1
        }

        bcrypt.hash(userSignup.password, saltRounds, async (err, hashedPwd) => {
            if (err) {
                res.status(406).json({ message: 'Der skete en fejl, prøv igen', type: 'error' });
            }

            newUser.password = hashedPwd;

            try {
                await new userSchema(newUser).save();
                res.status(200).json({ message: 'Profil oprettet', type: 'success' });
            } catch (error) {
                res.status(400).json({ message: 'Der skete en fejl, prøv igen', type: 'error' });
            }
        });
    }
});

api.post('/login', async (req, res) => {
    const body = req.body;
    const user = await userSchema.findOne({ email: body.email });

    if (user === null) {
        res.status(406).json({ message: 'Ingen bruger fundet', type: 'error' });
    } else {
        bcrypt.compare(body.password, user.password, (err, result) => {
            if (err) {
                res.status(400).json({message: 'Der skete en fejl, prøv igen', type: 'error'});
            }

            if (result === true) {
                if (user.profileType === 'student') {
                
                } else if (user.profileType === 'teacher') {
                    const aToken = createTeacherAccessToken(user);
                    const rToken = createTeacherRefreshToken(user);

                    const userAvatar = getUserAvatar(user.firstname, user.lastname);

                    sendRefreshToken(res, rToken);
                    res.status(200).json({ userAvatar: userAvatar, profileType: user.profileType, qbid: aToken });
                }
            } else {
                res.status(406).json({message: 'Forkert brugernavn eller adgagnskode', type: 'error'});
            }
        });
    }
});

api.post('/logout', (req, res) => {
    sendRefreshToken(res, '');
    res.status(200).json({ message: 'Du er blevet logget ud', type: 'success' });
});

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
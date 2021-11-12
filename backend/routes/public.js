import express from 'express';
const api = express.Router();
import bcrypt from 'bcrypt';
const saltRounds = 13;
import jwt from 'jsonwebtoken';

import userSchema from '../models/user.model.js';

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
            profileType: userSignup.profileType,
            firstname: userSignup.firstname,
            lastname: userSignup.email,
            email: userSignup.email,
            password: ''
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

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
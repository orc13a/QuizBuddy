import express from 'express';
const api = express.Router();
import bcrypt from 'bcrypt';
const saltRounds = 13;
import jwt from 'jsonwebtoken';

import teacherSchema from '../models/teacher.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/signup', async (req, res) => {
    const userSignup = req.body;
    const userType = userSignup.profileType;

    const findUser = await teacherSchema.findOne({ email: userSignup.email });

    if (findUser !== null) {
        res.status(406).json({ message: 'E-mail allerede i brug', type: 'error' });
    } else if (userSignup.passwordRepeat !== userSignup.password) {
        res.status(400).json({ message: 'Adgangskoderne er ikke ens', type: 'error' });
    } else {
        const newUser = {
            firstname: 'Oliver',
            lastname: 'Christensen',
            email: 'orc13a@live.dk',
            password: ''
        }

        bcrypt.hash(userSignup.password, saltRounds, async (err, hashedPwd) => {
            if (err) {
                res.status(406).json({ message: 'Der skete en fejl, prøv igen', type: 'error' });
            }

            newUser.password = hashedPwd;

            if (userType === 'student') {
                res.end();
            } else if (userType === 'teacher') {
                try {
                    await new teacherSchema(newUser).save();
                    res.status(200).json({ message: 'Profil oprettet', type: 'success' });
                } catch (error) {
                    res.status(400).json({ message: 'Der skete en fejl, prøv igen', type: 'error' });
                }
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
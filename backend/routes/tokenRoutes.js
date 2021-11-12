import express from 'express';
const api = express.Router();
import jwt from 'jsonwebtoken';
import { sendRefreshToken } from '../auth/sendRefreshToken.js';
import { createTeacherAccessToken, createTeacherRefreshToken } from '../auth/tokens.js';

import userSchema from '../models/user.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

// Giv user new access token
// r_t = refresh_token
api.post('/teacher', (req, res) => {
    const token = req.cookies['qbid'];

    if (!token) {
        res.status(406).json({ message: 'fejl1', type: 'error' });
    } else {
        try {
            jwt.verify(token, process.env.TEACHER_REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'fejl2', type: 'error', accessToken: '' });
                }

                userSchema.findOne({ email: decoded.user.email }, (err, docs) => {
                    const user = docs;

                    if (err) {
                        res.status(404).json({ message: 'fejl3', type: 'error', accessToken: '' });
                    } else if (user.tokenVersion !== decoded.tokenVersion) {
                        res.status(401).json({ message: 'fejl4', type: 'error', accessToken: '' });
                    } else if (decoded.user.profileType !== 'teacher') {
                        res.status(401).json({ message: 'fejl5', type: 'error', accessToken: '' });
                    } else {
                        sendRefreshToken(res, createTeacherRefreshToken(user));
                        res.status(200).json({ message: 'ok', type: 'success', accessToken: createTeacherAccessToken(user) });
                    } 
                });
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'fejl6', type: 'error', accessToken: '' });
        }
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
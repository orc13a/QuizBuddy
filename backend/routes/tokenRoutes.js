import express from 'express';
const api = express.Router();
import jwt from 'jsonwebtoken';
import { sendRefreshToken } from '../auth/sendRefreshToken.js';
import { createStudentAccessToken, createStudentRefreshToken, createTeacherAccessToken, createTeacherRefreshToken } from '../auth/tokens.js';

import userSchema from '../models/user.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

// Give user new access token
// r_t = refresh_token
api.post('/teacher', (req, res) => {
    let token = req.cookies['qbid'];

    // if (req.cookies['qbid'] === undefined || req.cookies['qbid'] === null || req.cookies['qbid']) {
    //     const t = req.headers['authorization'];
    //     token = t.split(' ')[1];
    // } else {
    //     token = req.cookies['qbid']
    // }

    if (!token) {
        res.status(406).json({ message: 'fejl1', type: 'error' });
    } else {
        try {
            jwt.verify(token, process.env.TEACHER_REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'fejl2', type: 'error', accessToken: '' });
                }

                userSchema.findOne({ userId: decoded.user.userId }, (err, docs) => {
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

api.post('/student', (req, res) => {
    let token = req.cookies['qbid'];

    // if (req.cookies['qbid'] === undefined || req.cookies['qbid'] === null || req.cookies['qbid']) {
    //     token = req.headers['authorization'].split[' '][1];
    // } else {
    //     token = req.cookies['qbid']
    // }

    if (!token) {
        res.status(406).json({ message: 'fejl1', type: 'error' });
    } else {
        try {
            jwt.verify(token, process.env.STUDENT_REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'fejl2', type: 'error', accessToken: '' });
                }

                userSchema.findOne({ userId: decoded.user.userId }, (err, docs) => {
                    const user = docs;

                    if (err) {
                        res.status(404).json({ message: 'fejl3', type: 'error', accessToken: '' });
                    } else if (user.tokenVersion !== decoded.tokenVersion) {
                        res.status(401).json({ message: 'fejl4', type: 'error', accessToken: '' });
                    } else if (decoded.user.profileType !== 'student') {
                        res.status(401).json({ message: 'fejl5', type: 'error', accessToken: '' });
                    } else {
                        sendRefreshToken(res, createStudentRefreshToken(user));
                        res.status(200).json({ message: 'ok', type: 'success', accessToken: createStudentAccessToken(user) });
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
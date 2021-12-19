// Importere vi de ting vi skal bruge her
import express from 'express';
const api = express.Router();
import bcrypt from 'bcrypt';
const saltRounds = 13;
import getUuid from 'uuid-by-string';

// Henter nogen af vores egne funktioner og database schemaer
import userSchema from '../models/user.model.js';
import { createStudentAccessToken, createStudentRefreshToken, createTeacherAccessToken, createTeacherRefreshToken } from '../auth/tokens.js';
import { sendRefreshToken } from '../auth/sendRefreshToken.js';
import { getUserAvatar } from '../functions/getUserAvatar.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

//   👇 Type af request     👇request
//   👇                     👇   👇response
api.post('/signup', async (req, res) => { // arrow funktion
//          👆 endpoint (url) denne requst er på
    const userSignup = req.body; // Tager vi de som bliver sendt med i requesten

    // Her finder vi noget i databasen, ved at bruge et schema, som vi selv har lavet,
    // det schema ligger i "models" mappen.
    //   Her vil vi kun finde en, da der 👇 kun brude være en og kun er en
    const findUser = await userSchema.findOne({ email: userSignup.email });
    // Det tager noget👆 tid, og det er et promise | {👆} det er vores query til at finde hvad vi vil finde

    if (findUser !== null) {
        // Alle HTTP koder og deres betydning: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
        // Response send HTTP status 406 og json objekt tilbage til den som requested
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

        // her bruger vi bcrypt til at hashe brugerens adgangskode
        // Her har vi valgt ikke at bruge "await" og lavet en "callback" funktion.
        // En callback funktion er lidt lige som et if statment, men venter på at få resultatet af "hash" funktionen og dermed kør kode blocken
        bcrypt.hash(userSignup.password, saltRounds, async (err, hashedPwd) => {
            if (err) {
                res.status(406).json({ message: 'Der skete en fejl, prøv igen', type: 'error' });
            }

            newUser.password = hashedPwd;

            // Try catch, prøv eller fang fejlen
            try {
                await new userSchema(newUser).save(); // Generer dokument udfra vores schema med given objekt "newUser"
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
                    const aToken = createStudentAccessToken(user);
                    const rToken = createStudentRefreshToken(user);

                    const userAvatar = getUserAvatar(user.firstname, user.lastname);

                    sendRefreshToken(res, rToken);
                    res.status(200).json({ userAvatar: userAvatar, profileType: user.profileType, qbid: aToken });
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
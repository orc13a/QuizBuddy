// ####
// Dette er vores mother fil i vores server
// ####

// Importere hvad vi skal bruge
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 2000;
// process.env.DBCONSTR er et environment variable
// De er i en fil ".env", ikke en man tager med i GitHub og dermed har kun serven den, eller hvis man selv laver en for at kunne udvikle
// Der holder man på fx den string som man skal bruge til at connecte til databasen.
// Der gemmer man også sercet ting som api keys osv.
const DBCONSTR = process.env.DBCONSTR;

// .use, giver sig selv, brug givet
// Origin:
// Dev
// const originUrl ='http://localhost:3000'
// pro
const originUrl = '*';
// server.use(cors({
//     origin: originUrl,
//     credentials: true
// }));
server.options('*', cors());
server.use(bodyParser.json());
server.use(cookieParser());

// En route/endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'QuizBuddy API', version: '1.0.4' });
});

// Vores routes
import publicRouter from './routes/public.js';
import rkRouter from './routes/tokenRoutes.js';
import teacherRouter from './routes/teachers.js';
import studentRouter from './routes/students.js';
import assignmentRouter from './routes/assignments.js';

server.use('/public', publicRouter);
server.use('/r_t', rkRouter); // tokens
server.use('/teachers', teacherRouter);
server.use('/students', studentRouter);
server.use('/assignments', assignmentRouter);

// 404, hvis det som brugeren prøver at requeste til ikke er nogen af vores routes sender den denne.
server.get('*', (req, res) => {
    res.status(404).json({ message: '404', type: 'error' });
});

// Opret forbindels til databasen og start serveren
mongoose.connect(DBCONSTR, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    server.listen(PORT, () => { // On connection
        console.log(`\n==> Connected to database successfully`);
        console.log(`==> Server listning on port: ${PORT}\n`);
    });
}).catch((err) => { // If err and not connected
    console.log(err);
});
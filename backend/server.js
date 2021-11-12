import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 2000;
const DBCONSTR = process.env.DBCONSTR;

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(bodyParser.json());
server.use(cookieParser());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'QuizBuddy API' });
});

import rkRouter from './routes/tokenRoutes.js';
import teacherRouter from './routes/teachers.js';
import publicRouter from './routes/public.js';

server.use('/r_t', rkRouter); // tokens
server.use('/teachers', teacherRouter);
server.use('/public', publicRouter);

server.get('*', (req, res) => {
    res.status(404).json({ message: '404', type: 'error' });
});

mongoose.connect(DBCONSTR, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    server.listen(PORT, () => { // On connection
        console.log(`\n==> Connected to database successfully`);
        console.log(`==> Server listning on port: ${PORT}\n`);
    });
}).catch((err) => { // If err and not connected
    console.log(err);
});
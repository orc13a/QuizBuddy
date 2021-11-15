import express from 'express';
const api = express.Router();
import { studentRouteIsAuth } from '../auth/teacherRouteIsAuth.js';
import { getStudent } from '../auth/tokens.js';
import teamSchema from '../models/team.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/student/team/find', studentRouteIsAuth, async (req, res) => {
    const user = await getStudent(req);
});

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
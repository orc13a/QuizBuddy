import express from 'express';
const api = express.Router();
import { teacherRouteIsAuth } from '../auth/teacherRouteIsAuth.js';
import { getUser } from '../auth/tokens.js';

// ----------------------------------------
// GET requests
// ----------------------------------------



// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/teams/create', teacherRouteIsAuth, async (req, res) => {
    const user = await getUser(req);
    console.log(user);
    res.end();
});

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
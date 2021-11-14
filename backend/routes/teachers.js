import express from 'express';
const api = express.Router();
import { teacherRouteIsAuth } from '../auth/teacherRouteIsAuth.js';
import { getTeacher } from '../auth/tokens.js';
import getUuid from 'uuid-by-string';
import teamSchema from '../models/team.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------

api.get('/teams/get', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    try {
        const teams = await teamSchema.find({ creatorId: teacher.userId });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/teams/create', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;
    
    if (!body.teamName && body.teamName.length === 0) {
        res.status(406).json({ message: 'Holdnavn ikke angivet', type: 'error' });
    }

    try {
        const findTeam = await teamSchema.findOne({ creatorId: teacher.userId, teamName: body.teamName }).exec();
        if (findTeam) {
            res.status(406).json({ message: 'Du har allerede et hold med det navn', type: 'error' });
        } else {
            const newTeamShareCode = getUuid(`${teacher.email}-${body.teamName}`);
            const newTeam = {
                teamId: getUuid(`${teacher.userId}-${newTeamShareCode}`),
                creatorId: teacher.userId,
                shareCode: newTeamShareCode,
                teamName: body.teamName
            }
            await teamSchema(newTeam).save();
            res.status(200).json({ message: `Hold '${body.teamName}' er blevet oprettet`, type: 'success' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
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
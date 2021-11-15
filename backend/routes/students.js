import express from 'express';
const api = express.Router();
import { studentRouteIsAuth } from '../auth/studentRouteIsAuth.js';
import { getStudent } from '../auth/tokens.js';
import teamSchema from '../models/team.model.js';
import userSchema from '../models/user.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------

api.get('/student', studentRouteIsAuth, async (req, res) => {
    try {
        const student = await getStudent(req);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/teams/find', studentRouteIsAuth, async (req, res) => {
    const body = req.body;

    try {
        const findTeam = await teamSchema.findOne({ shareCode: body.teamShareCode }).exec();

        if (findTeam === null) {
            res.status(404).json({ message: 'Der blev ikke fundet noget hold', type: 'error' });
        } else {
            res.status(200).json(findTeam);
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/teams/join', studentRouteIsAuth, async (req, res) => {
    const student = await getStudent(req);
    const body = req.body;
    
    try {
        const team = await teamSchema.findOne({ shareCode: body.teamShareCode, creatorId: body.teamCreatorId }).exec();

        if (team === null) {
            res.status(404).json({ message: 'Der blev ikke fundet noget hold', type: 'error' });
        } else {
            const teamJoinedObj = {
                teamId: team.teamId, 
                teamName: team.teamName
            };
            const teamMemberObj = {
                firstName: 
            };
            await userSchema.findOneAndUpdate({ userId: student.userId }, {$push: { teams: teamJoinedObj }});
            await teamSchema.findOneAndUpdate({ teamId: team.teamId }, {$push: {members: }})
            res.status(200).json({ message: `Du er nu tilsluttet holdet '${team.teamName}'`, type: 'success' });
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
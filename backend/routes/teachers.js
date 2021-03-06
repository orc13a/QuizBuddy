import express from 'express';
const api = express.Router();
import { teacherRouteIsAuth } from '../auth/teacherRouteIsAuth.js';
import { getTeacher } from '../auth/tokens.js';
import getUuid from 'uuid-by-string';
import teamSchema from '../models/team.model.js';
import userSchema from '../models/user.model.js';
import assignmentSchema from '../models/assignment.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------

api.get('/teacher/', teacherRouteIsAuth, async (req, res) => {
    try {
        const teacher = await getTeacher(req);
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/teams/get/all', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    try {
        const teams = await teamSchema.find({ creatorId: teacher.userId });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/teams/get/select', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    try {
        const teamsArr = [];
        teacher.teams.forEach(team => {
            let selectObj = { value: team.teamId, label: team.teamName };
            teamsArr.push(selectObj);
        });
        res.status(200).json(teamsArr);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/teams/get/:teamId', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const teamId = req.params['teamId'];

    try {
        const team = await teamSchema.findOne({ creatorId: teacher.userId, teamId: teamId });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/assignment/:assignmentId/results', teacherRouteIsAuth, async (req, res) => {
    const assignmentId = req.params['assignmentId'];
    
    try {
        const assignment = await assignmentSchema.findOne({ assignmentId: assignmentId });
        
        res.status(200).json({ results: assignment.results });
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
            const teacherTeamObj = {
                teamId: newTeam.teamId,
                creatorId: teacher.userId,
                teamName: body.teamName
            }
            await teamSchema(newTeam).save();
            await userSchema.findOneAndUpdate({ userId: teacher.userId }, {$push: { teams: teacherTeamObj }});
            res.status(200).json({ message: `Hold '${body.teamName}' er blevet oprettet`, type: 'success', createdTeamId: newTeam.teamId });
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/teams/delete/:teamId', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const teamId = req.params['teamId'];

    try {
        const team = await teamSchema.findOne({ teamId: teamId });
        const members = team.members;
        members.forEach(async (member) => {
            await userSchema.updateOne({ userId: member.userId }, { $pull: { "teams": { teamId: teamId } } });
        });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }

    try {
        await userSchema.findOneAndUpdate({ userId: teacher.userId }, { $pull: { "teams": { teamId: teamId } } }).exec();
        await teamSchema.findOneAndRemove({ creatorId: teacher.userId, teamId: teamId });
        res.status(200).json({ message: 'Hold slettet', type: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/teams/remove/student', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;
    
    try {
        await userSchema.findOneAndUpdate({ userId: body.studentId }, { $pull: { "teams": { teamId: body.teamId } } }).exec();
        await teamSchema.findOneAndUpdate({ creatorId: teacher.userId, teamId: body.teamId }, { $pull: { "members": { userId: body.studentId } } }).exec();
        res.status(200).json({ message: 'Elev fjernet', type: 'success' });
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
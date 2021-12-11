import express from 'express';
const api = express.Router();
import { studentRouteIsAuth } from '../auth/studentRouteIsAuth.js';
import { getStudent } from '../auth/tokens.js';
import teamSchema from '../models/team.model.js';
import userSchema from '../models/user.model.js';
import assignmentSchema from '../models/assignment.model.js';
import userInAssignmentSchema from '../models/userInAssignment.model.js';
import questionSchema from '../models/question.model.js';

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

api.get('/teams/get/:teamId', studentRouteIsAuth, async (req, res) => {
    // const student = await getStudent(req);
    const teamId = req.params['teamId'];

    try {
        const team = await teamSchema.findOne({ teamId: teamId });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/assignment/:assignmentId/get/question/:questionId', studentRouteIsAuth, async (req, res) => {
    const assignmentId = req.params['assignmentId'];
    const questionId = req.params['questionId'];

    try {
        const question = await assignmentSchema.findOne({ assignmentId: assignmentId }, { "questions": { $elemMatch: { questionId: questionId } } });
        if (question.questions[0] === null) {
            res.status(200).json(null);
        } else {
            res.status(200).json(question.questions[0]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/assignment/:assignmentId/getIndex/question/:questionIndex', studentRouteIsAuth, async (req, res) => {
    const assignmentId = req.params['assignmentId'];
    const questionIndex = req.params['questionIndex'];

    try {
        const assignment = await assignmentSchema.findOne({ assignmentId: assignmentId });
        if (assignment.questions[questionIndex] === null) {
            res.status(200).json(null);
        } else {
            res.status(200).json(assignment.questions[questionIndex]);
        }
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
                userId: student.userId,
                firstname: student.firstname,
                lastname: student.lastname,
            };
            await userSchema.findOneAndUpdate({ userId: student.userId }, {$push: { teams: teamJoinedObj }});
            await teamSchema.findOneAndUpdate({ teamId: team.teamId }, {$push: {members: teamMemberObj }})
            res.status(200).json({ message: `Du er nu tilsluttet holdet '${team.teamName}'`, type: 'success' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/teams/leave/:teamId', studentRouteIsAuth, async (req, res) => {
    const student = await getStudent(req);
    const teamId = req.params['teamId'];

    try {
        await teamSchema.findOneAndUpdate({ teamId: teamId }, { $pull: { "members": { userId: student.userId } } }).exec();
        await userSchema.findOneAndUpdate({ userId: student.userId }, { $pull: { "teams": { teamId: teamId } } }).exec();
        res.status(200).json({ message: `Du har forladt holdet`, type: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/assignment/:assignmentId/start', studentRouteIsAuth, async (req, res) => {
    const student = await getStudent(req);
    const assignmentId = req.params['assignmentId'];
    const body = req.body;

    try {
        const alreadyStartedCheck = await assignmentSchema.findOne({ assignmentId: assignmentId }, { 'studentsStarted': { $elemMatch: { assignmentId: assignmentId, studentId: student.userId }}}).exec();
        
        if (alreadyStartedCheck.studentsStarted.length > 0) {
            res.status(406).json({ message: 'Elev allerede startet opgaven', type: 'error' });
        } else {
            const assignment = await assignmentSchema.findOne({ assignmentId: assignmentId }).exec();

            // questionId: assignment.questions[0].questionId,
            const startObj = userInAssignmentSchema({
                studentId: student.userId,
                assignmentId: body.assignmentId,
                firstname: student.firstname,
                lastname: student.lastname, 
                time: 0,
                questionIndex: 0
            });

            await assignmentSchema.findOneAndUpdate({ assignmentId: assignmentId }, { $push: { studentsStarted: startObj }}).exec();

            res.status(200).json({ message: 'Elev startet på opgaven', type: 'success', startQuestionId: assignment.questions[0].questionId });
        }
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('assignment/:assignmentId/question/:questionId/answer', studentRouteIsAuth, async (req, res) => {
    const student = await getStudent(req);
    const assignmentId = req.params['assignmentId'];
    const questionId = req.params['questionId'];
    const body = req.body;

    
});

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
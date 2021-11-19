import express from 'express';
const api = express.Router();
import { teacherRouteIsAuth } from '../auth/teacherRouteIsAuth.js';
import { getTeacher } from '../auth/tokens.js';
import getUuid from 'uuid-by-string';
import teamSchema from '../models/team.model.js';
import questionSchema from '../models/questionResult.model.js';
import assignmentSchema from '../models/assignment.model.js';

// ----------------------------------------
// GET requests
// ----------------------------------------

api.get('/get/:assignmentId', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const assignmentId = req.params['assignmentId'];

    try {
        const assignment = await assignmentSchema.findOne({ creatorId: teacher.userId, assignmentId: assignmentId }).exec();
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.get('/get/:assignmentId/question/:questionId', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const assignmentId = req.params['assignmentId'];
    const questionId = req.params['questionId'];

    try {
        const question = await assignmentSchema.findOne({ creatorId: teacher.userId, assignmentId: assignmentId }, { "questions": { $elemMatch: { questionId: questionId } } });
        if (question.questions[0] === null) {
            res.status(200).json(null);
        } else {
            res.status(200).json(question.questions[0]);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

// ----------------------------------------
// POST requests
// ----------------------------------------

api.post('/create', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;

    try {
        const newAssignmentId = getUuid(`${teacher.userId}-${body.assignmentName}`)
        const newAssignmentObj = {
            assignmentId: newAssignmentId,
            creatorId: teacher.userId,
            teamId: body.selectedTeamId,
            name: body.assignmentName
        };
        const teamAssigmentObj = {
            assignmentId: newAssignmentId,
            name: body.assignmentName
        }
        await assignmentSchema(newAssignmentObj).save();
        await teamSchema.findOneAndUpdate({ creatorId: teacher.userId, teamId: body.selectedTeamId }, { $push: { assignments: teamAssigmentObj } }).exec();
        res.status(200).json({ message: 'Opgave oprettet', type: 'success', assignmentName: body.assignmentName, assignmentId: newAssignmentId });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/delete', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;
    
    try {
        await teamSchema.findOneAndUpdate({ creatorId: teacher.userId, teamId: body.teamId }, { $pull: { "assignments": { assignmentId: body.assignmentId } } }).exec();
        await assignmentSchema.findOneAndRemove({ creatorId: teacher.userId, assignmentId: body.assignmentId });
        res.status(200).json({ message: 'Opgave slettet', type: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/question/delete', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;
    
    try {
        await assignmentSchema.findOneAndUpdate({ creatorId: teacher.userId, assignmentId: body.assignmentId }, { $pull: { "questions": { questionId: body.questionId } } });
        res.status(200).json({ message: 'Spørgsmål slettet', type: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Der opstod en fejl, prøv igen', type: 'error' });
    }
});

api.post('/question/create', teacherRouteIsAuth, async (req, res) => {
    const teacher = await getTeacher(req);
    const body = req.body;

    try {
        const qObj = {
            questionId: getUuid(`${teacher.userId}-${body.questionTitle}`),
            creatorId: teacher.userId,
            assignmentId: body.assignmentId,
            title: body.questionTitle,
            text: body.questionText,
            answer: body.questionAnswer
        }

        const q = await questionSchema(qObj);
        await assignmentSchema.findOneAndUpdate({ creatorId: teacher.userId, assignmentId: body.assignmentId }, { $push: { questions: q } }).exec();

        res.status(200).json({ message: 'Spørgsmål oprettet', type: 'success' });
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
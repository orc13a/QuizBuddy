import express from 'express';
const api = express.Router();
import { studentRouteIsAuth } from '../auth/studentRouteIsAuth.js';
import { getStudent } from '../auth/tokens.js';
import teamSchema from '../models/team.model.js';
import userSchema from '../models/user.model.js';
import assignmentSchema from '../models/assignment.model.js';
import userInAssignmentSchema from '../models/userInAssignment.model.js';
import questionResultSchema from '../models/questionResult.model.js';

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

api.post('/question/answer', studentRouteIsAuth, async (req, res) => {
    // /assignment/:assignmentId/answer/question/:questionId
    const student = await getStudent(req);
    // const assignmentId = req.params['assignmentId'];
    // const questionId = req.params['questionId'];
    const body = req.body;
    const assignmentId = body.assignmentId;
    const questionId = body.questionId;
    let findByIndex = false;

    let resultObj = {
        student: student,
        isAnswerCorrect: false,
        answer: body.answer,
        questionId: questionId,
        assignmentId: assignmentId,
    }

    if (questionId.replace(/[^-]/g, "").length < 4) {
        findByIndex = true;
    }

    try {
        const assignment = await assignmentSchema.findOne({ assignmentId: assignmentId }).exec();
        const questions = assignment.questions;
        let question = null;

        if (findByIndex) {
            if (questions[questionId] === undefined) {
                res.status(406).json({ message: 'Spørgsmål ikke fundet', type: 'error' });
            } else {
                question = questions[questionId];
            }
        } else {
            questions.forEach(q => {
                if (q.questionId === questionId) {
                    if (q !== undefined) {
                        question = q;
                    }
                }
            });
        }

        if (question === null) {
            res.status(406).json({ message: 'Spørgsmål ikke fundet', type: 'error' });
        } else {
            if (question.noCorrectAnswer === false) {
                if (question.answer === body.answer) {
                    resultObj.isAnswerCorrect = true;
                } else {
                    resultObj.isAnswerCorrect = false;
                }
            } else {
                resultObj.isAnswerCorrect = true;
            }
        }

        const result = await questionResultSchema(resultObj);
        // let findStudentResults = false;
        // let findStudentResultsIndex = 0;

        // for (let i = 0; i < assignment.results.length; i++) {
        //     const r = array[i];
        //     if (r.studentId === student.userId) {
        //         findStudentResults = true;
        //         findStudentResultsIndex = i;
        //     }
        // }

        const findStudentResults = await assignmentSchema.findOne({ assignmentId: assignmentId, 'results.studentId': student.userId }).exec();

        if (findStudentResults === null) {
            // assignmentSchema.findByIdAndUpdate({ assignmentId: assignmentId, 'result.studentId': student.userId }, {
            //     $addToSet: { 'results': result }
            // });
        } else {
            const obj = {
                studentId: student.userId,
                firstname: student.firstname,
                lastname: student.lastname,
                result: result
            }
            // assignmentSchema.findByIdAndUpdate({ assignmentId: assignmentId }, { $push: { results: obj }});
        }

        res.status(200).json({ message: 'OK' });
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
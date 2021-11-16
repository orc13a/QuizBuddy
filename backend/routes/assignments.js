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
})

// ----------------------------------------
// PUT requests
// ----------------------------------------



// ----------------------------------------
// DELETE requests
// ----------------------------------------



// ----------------------------------------
export default api;
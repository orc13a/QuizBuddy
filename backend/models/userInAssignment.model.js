import mongoose from "mongoose";

const UserInAssignmentSchema = mongoose.Schema({
    studentId: String,
    assignmentId: String,
    time: String,
    questionId: String,
    nextQuestionId: String,
    startedAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('userInAssignments', UserInAssignmentSchema);
import mongoose from "mongoose";

const UserInAssignmentSchema = mongoose.Schema({
    studentId: String,
    firstname: String,
    lastname: String,
    assignmentId: String,
    time: Number,
    questionIndex: Number,
    startedAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('userInAssignments', UserInAssignmentSchema);
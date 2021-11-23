import mongoose from "mongoose";

const AssignmentSchema = mongoose.Schema({
    assignmentId: String,
    creatorId: String,
    teamId: String,
    name: String,
    timeType: String,
    time: String,
    openTo: String,
    questions: [],
    results: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('assignments', AssignmentSchema);
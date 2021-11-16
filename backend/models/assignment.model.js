import mongoose from "mongoose";

const AssignmentSchema = mongoose.Schema({
    assignmentId: String,
    creatorId: String,
    name: String,
    questions: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('assignments', AssignmentSchema);
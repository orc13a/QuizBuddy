import mongoose from "mongoose";

const AssignmentSchema = mongoose.Schema({
    assignmentId: String,
    creatorId: String,
    teamId: String,
    name: String,
    timeType: String,
    timeLimitHours: Number,
    timeLimitMinutes: Number,
    openTo: String,
    openToDate: Date,
    studentsStarted: [],
    questions: [],
    results: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('assignments', AssignmentSchema);
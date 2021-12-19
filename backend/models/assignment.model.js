import mongoose from "mongoose";

// Opret schema og dens "felter"
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

// gem, dette bliver til en collection i vores database
export default mongoose.model('assignments', AssignmentSchema);
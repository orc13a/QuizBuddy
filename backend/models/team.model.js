import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
    teamId: String,
    creatorId: String,
    shareCode: String,
    teamName: String,
    members: [],
    assignments: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('teams', TeamSchema);
import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
    teamId: String,
    creator: {},
    shareCode: String,
    members: [],
    assignments: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('teams', TeamSchema);
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userId: String,
    profileType: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    tokenVersion: Number,
    teams: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('users', UserSchema);
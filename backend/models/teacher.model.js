import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    tokenVersion, Number,
    teams: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('teachers', TeacherSchema);
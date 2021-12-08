import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    questionId: String,
    creatorId: String,
    assignmentId: String,
    title: String,
    text: String,
    answer: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});
export default mongoose.model('questions', QuestionSchema);
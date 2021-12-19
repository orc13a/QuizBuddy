import mongoose from "mongoose";

const QuestionResultSchema = mongoose.Schema({
    student: Object,
    answer: String,
    isAnswerCorrect: Boolean,
    questionId: String,
    questionTitle: String,
    questionText: String,
    assignmentId: String,
    answeredAt: {
        type: Date,
        default: new Date()
    },
});
export default mongoose.model('QuestionResults', QuestionResultSchema);
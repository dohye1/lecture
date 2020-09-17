import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    professor_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    student_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    class_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    first_score: {
        type: Number
    },
    second_score: {
        type: Number
    },
    third_score: {
        type: Number
    },
    fourth_score: {
        type: Number
    },
    fifth_score: {
        type: Number
    }
});

const model = mongoose.model('Score', scoreSchema);

export default model;
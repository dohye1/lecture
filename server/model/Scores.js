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
    mid_score: {
        type: Number,
        required: true
    },
    final_score: {
        type: Number,
        required: true
    },
    first_score: {
        type: Number,
        required: true
    },
    second_score: {
        type: Number,
        required: true
    },
    third_score: {
        type: Number,
        required: true
    }
});

const model = mongoose.model('Score', scoreSchema);

export default model;
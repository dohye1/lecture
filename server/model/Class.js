import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    class_title: {
        type: String,
        required: true
    },
    class_department: {
        type: String,
        required: true
    },
    class_room: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    finish_date: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    finish_time: {
        type: String,
        required: true
    },
    std_max: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score_type: [{
        type: Number,
        default: [1]
    }],
    scores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }],
    isFinished: {
        type: Number,
        required: true,
        default: 1
    }
});

const model = mongoose.model('Class', classSchema);

export default model;
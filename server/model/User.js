import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    std_num: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    scores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }],
    role: {
        type: Number,
        required: true
    },
    token: String
});

const model = mongoose.model('User', userSchema);

export default model;
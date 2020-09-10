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
    }
});

const model = mongoose.model('Class', classSchema);

export default model;
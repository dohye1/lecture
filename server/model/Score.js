import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  professor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  scores: {
    type: Array
  }
});

const model = mongoose.model('Score', scoreSchema);

export default model;

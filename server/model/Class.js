import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  professor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  professor_name: {
    type: String,
    required: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
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
  end_date: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  std_count: {
    type: Number,
    default: 0
  },
  std_max: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  score_title: [
    {
      type: String
    }
  ],
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Score'
    }
  ],
  isFinished: {
    type: Boolean,
    required: true,
    default: false
  }
});

const model = mongoose.model('Class', classSchema);

export default model;

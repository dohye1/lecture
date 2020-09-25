import Class from '../model/Class';
import User from '../model/User';
import Score from '../model/Score';

export const getAll = async (req, res) => {
  try {
    const all = await Class.find().populate('students').populate('scores');
    return res.status(200).json({ allClass: true, all });
  } catch (error) {
    console.error(error);
  }
};

export const postNew = async (req, res) => {
  // 교수정보
  const {
    user: { _id, department, name },
    body: { title, room, date, time, maxNum, description, scoreArr, scoreText }
  } = req;
  try {
    let scoreTitle = [];
    scoreArr.map((item, index) => {
      if (item) {
        scoreTitle = [...scoreTitle, scoreText[index]];
      }
    });
    const newClass = await Class.create({
      professor_id: _id,
      professor_name: name,
      class_title: title,
      class_department: department,
      class_room: room,
      start_date: date[0],
      end_date: date[1],
      start_time: time[0],
      end_time: time[1],
      std_max: maxNum,
      description: description,
      score_title: scoreTitle
    });
    await User.findByIdAndUpdate(
      { _id },
      { $addToSet: { classes: [newClass._id] } }
    );
    return res.status(200).json({ newLecture: true });
  } catch (error) {
    console.error(error);
  }
};

export const postEnroll = async (req, res) => {
  const {
    user: { _id },
    body: { lectureId, professorId }
  } = req;
  try {
    const newScore = await Score.create({
      professor_id: professorId,
      student_id: _id,
      class_id: lectureId
    });
    await Class.findByIdAndUpdate(
      { _id: lectureId },
      {
        $addToSet: { students: [_id], scores: [newScore._id] },
        $inc: { std_count: 1 }
      }
    );
    await User.findByIdAndUpdate(
      { _id },
      {
        $addToSet: { classes: [lectureId], scores: [newScore._id] }
      }
    );
    await User.findByIdAndUpdate(
      { _id: professorId },
      { $addToSet: { scores: [newScore._id] } }
    );
    return res.status(200).json({ enrollResult: true });
  } catch (error) {
    console.error(error);
  }
};

import Class from '../model/Class';
import User from '../model/User';

export const getAll = async (req, res) => {
  try {
    const all = await Class.find().populate('students');
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
    if (!newClass) {
      return res.status(200).json({ newLecture: false });
    }
    const proResult = await User.findByIdAndUpdate(
      { _id },
      { $addToSet: { classes: [newClass._id] } }
    );
    if (!proResult) {
      return res.status(200).json({ newLecture: false });
    }
    return res.status(200).json({ newLecture: true });
  } catch (error) {
    console.error(error);
  }
};

export const postEnroll = async (req, res) => {
  const {
    user: { _id },
    body: { lectureId }
  } = req;
  try {
    const enrollClassResult = await Class.findByIdAndUpdate(
      { _id: lectureId },
      { $addToSet: { students: [_id] } }
    );
    if (!enrollClassResult) {
      return res.status(200).json({ enrollResult: false });
    }
    const enrollUserResult = await User.findByIdAndUpdate(
      { _id },
      { $addToSet: { classes: [enrollClassResult._id] } }
    );
    if (!enrollUserResult) {
      return res.status(200).json({ enrollResult: false });
    }
    return res.status(200).json({ enrollResult: true });
  } catch (error) {
    console.error(error);
  }
};

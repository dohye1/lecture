import Class from '../model/Class';

const departmentArr = [
  '소속대학',
  '인문대학',
  '사회과학대학',
  '자연과학대학',
  '경상대학',
  '법과대학',
  '공과대학',
  '농업생명과학대학',
  '사범대학',
  '예술대학',
  '치과대학',
  '수의과대학',
  '생활과학대학',
  'IT대학',
  '약학대학',
  '행정학부'
];

export const getAll = async (req, res) => {
  try {
    const all = await Class.find();
    return res.status(200).json({ allClass: true, all });
  } catch (error) {
    console.error(error);
  }
};

export const getDepartment = (req, res) => {
  console.log(req);
};

export const getDetail = (req, res) => {
  console.log(req);
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
    return res.status(200).json({ newLecture: true, lectureData: newClass });
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
    const enrollResult = await Class.findByIdAndUpdate(
      { _id: lectureId },
      { $addToSet: { students: [_id] } }
    );
    if (!enrollResult) {
      return res.status(200).json({ enrollResult: false });
    }
    return res.status(200).json({ enrollResult: true });
  } catch (error) {
    console.error(error);
  }
};

import Class from '../model/Class';
import User from '../model/User';
import Score from '../model/Score';

export const postEvaluate = async (req, res) => {
  const {
    body: { classId, stdId, score0, score1, score2, score3, score4 },
    user: { _id }
  } = req;

  try {
    const evaluate = await Score.create({
      professor_id: _id,
      student_id: stdId,
      class_id: classId,
      scores: [score0, score1, score2, score3, score4]
    });
    await Class.findByIdAndUpdate(
      { _id: classId },
      { $addToSet: { scores: evaluate._id } }
    );
    await User.findByIdAndUpdate(
      { _id: _id },
      { $addToSet: { scores: [evaluate._id] } }
    );
    await User.findByIdAndUpdate(
      { _id: stdId },
      { $addToSet: { scores: [evaluate._id] } }
    );

    return res.status(200).json({ c: true, scoreInfo: evaluate });
  } catch (error) {
    console.error(error);
  }
};

export const postShow = async (req, res) => {
  console.log(req);
  try {
  } catch (error) {
    console.error(error);
  }
};

import Class from '../model/Class';
import User from '../model/User';
import Score from '../model/Score';

export const postEvaluate = async (req, res) => {
  const {
    body: { scoreId, score0, score1, score2, score3, score4 }
  } = req;

  try {
    await Score.findByIdAndUpdate(
      { _id: scoreId },
      { scores: [score0, score1, score2, score3, score4] }
    );
    return res.status(200).json({ evaluateResult: true });
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

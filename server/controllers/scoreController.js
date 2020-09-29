import Score from '../model/Score';

export const postEvaluate = async (req, res) => {
  const {
    body: { scoreId, score0, score1, score2, score3, score4 }
  } = req;
  console.log(scoreId, [score0, score1, score2, score3, score4]);
  try {
    const scoreInfo = await Score.findByIdAndUpdate(
      { _id: scoreId },
      { scores: [score0, score1, score2, score3, score4] }
    );
    return res.status(200).json({ evaluateResult: true, scoreInfo });
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

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

// 학생스코어박스에는 해당수업에대한 성적을 보여줌
const StudentScore = ({ lecture }) => {
    const [MatchedScore, setMatchedScore] = useState();
    const [TotalScore, setTotalScore] = useState(0);
    const user = useSelector((state) => state.userReducer.user);
    let countScoreNum;
    const MyScore = () => {
        return lecture.length > 0 ? (
            <div>
                {lecture[0].score_title.map((scoreTitle, index) => (
                    <div key={index}>
                        <p className="hide">{(countScoreNum = index + 1)}</p>
                        <h3>{scoreTitle}</h3>
                        <p>
                            {MatchedScore && MatchedScore.scores[index] !== ''
                                ? MatchedScore.scores[index]
                                : '아직 성적이 입력되지 않았습니다'}
                        </p>
                    </div>
                ))}
                <p>
                    성적(총 합계 / 총 과목수) :
                    {Math.round((TotalScore / countScoreNum) * 100) / 100}
                </p>
            </div>
        ) : (
            <div>강의를 선택하세요</div>
        );
    };

    useEffect(() => {
        let totalScore = 0;
        if (lecture.length > 0 && MatchedScore === undefined) {
            lecture[0].scores.map((score, index) => {
                if (score.student_id == user.id) {
                    totalScore = score.scores.reduce(
                        (totalScore, currValue) => {
                            return parseInt(currValue) > 0
                                ? totalScore + parseInt(currValue)
                                : totalScore;
                        },
                        0,
                    );
                    setTotalScore(totalScore);
                    setMatchedScore(score);
                }
            });
        }
    }, [MatchedScore]);

    return (
        <div className="std-score-container">
            <h1>{lecture[0] && lecture[0].class_title}</h1>

            <div className="score-box">
                <div>
                    <MyScore />
                </div>
            </div>
        </div>
    );
};

export default StudentScore;

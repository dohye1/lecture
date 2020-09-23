import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evaluateScore } from '../../../actions/score_action';
import './styles.scss';

// 교수스코어박스에는 모든학생에 대한 박스가 있고 그 박스를 클릭하면 구체적인 성적을 입력할수있다.
// db에 값을 저장해야하기때문에 dispatch를 사용함

const ProfessorScore = ({ lecture }) => {
    const dispatch = useDispatch();
    console.log(lecture);
    const submitScore = (e) => {
        e.preventDefault();

        const scoreData = {
            classId: lecture[0]._id,
            stdId: e.target.parentNode.children[3].innerText,
            score0: e.target.score0 ? e.target.score0.value : -1,
            score1: e.target.score1 ? e.target.score1.value : -1,
            score2: e.target.score2 ? e.target.score2.value : -1,
            score3: e.target.score3 ? e.target.score3.value : -1,
            score4: e.target.score4 ? e.target.score4.value : -1,
        };

        dispatch(evaluateScore(scoreData));
    };
    const InputScoreBox = ({ student, score }) => {
        return (
            <div className="input-score">
                <div className="std-info">
                    <p className="name">{student.name}</p>
                    <p>
                        {student.department} / {student.id_num}
                    </p>
                </div>

                <div className="hide">{student._id}</div>

                <form onSubmit={submitScore}>
                    {score.map((item, index) => (
                        <div
                            id={`score${index}`}
                            key={`score${index}`}
                            className="input-box"
                        >
                            <label htmlFor={`score${index}`}>{item}</label>
                            <input
                                type="text"
                                name={`score${index}`}
                                id={`score${index}`}
                            />
                        </div>
                    ))}
                    <button type="submit">성적저장</button>
                </form>
            </div>
        );
    };

    const Title = () => {
        return lecture && lecture.length > 0 ? (
            <div className="title">
                <p>
                    {lecture[0].class_title}
                    <br />
                    <span>
                        성적은 100점만점 기준으로 입력하고 최종 성적은
                        (모든성적의 합 / 성적평가 개수) 로 구해집니다
                    </span>
                </p>
            </div>
        ) : (
            <>수업을 선택해 주세요</>
        );
    };

    const Test = () => {
        return lecture && lecture.length > 0 ? (
            lecture[0].students.map((student) => (
                <InputScoreBox
                    student={student}
                    score={lecture[0].score_title}
                    key={student._id}
                />
            ))
        ) : (
            <></>
        );
    };

    return (
        <div className="pro-score-container">
            <Title />
            <Test />
        </div>
    );
};

export default ProfessorScore;

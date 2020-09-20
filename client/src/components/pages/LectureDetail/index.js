import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { enrollClass } from '../../../actions/class_action';

import './styles.scss';

//강의내용을 보고 강의신청할수있는 페이지임
const LectureDetail = (props) => {
    const dispatch = useDispatch();
    const lectures = useSelector((state) => state.classReducer.class);
    const enrollResult = useSelector(
        (state) => state.classReducer.enrollResult,
    );

    const [Lecture, setLecture] = useState();
    const lectureId = props.match.params.id;
    const handleApply = (e) => {
        e.preventDefault();
        dispatch(enrollClass({ lectureId: lectureId }));
    };

    useEffect(() => {
        console.log(enrollClass);
        if (enrollResult) {
            props.history.push('/');
        }
        if (lectures) {
            lectures.map((lecture) => {
                if (lecture._id === lectureId) {
                    setLecture(lecture);
                    return;
                }
            });
        }
    }, [lectures, enrollResult]);

    return (
        <div className="lecture-detail-container">
            <h2>강의계획서</h2>
            <div className="lecture-info">
                {Lecture && (
                    <>
                        <p>강의명</p>
                        <p>{Lecture.class_title}</p>
                        <p>개설 학과</p>
                        <p>{Lecture.class_department}</p>
                        <p>교수</p>
                        <p>{Lecture.professor_name}</p>
                        <p>강의실</p>
                        <p>{Lecture.class_room}</p>
                        <p>강의기간</p>
                        <p>
                            {Lecture.start_date} - {Lecture.end_date}
                        </p>
                        <p>강의시간</p>
                        <p>
                            {Lecture.start_time} - {Lecture.end_time}
                        </p>
                        <p>수강인원</p>
                        <p>{Lecture.std_max}</p>
                        <p>강의설명</p>
                        <p>{Lecture.description}</p>
                        <p>성적산정방식</p>
                        <div className="score-title">
                            {Lecture.score_title.map((title) => (
                                <h6 key={title}>{title}</h6>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="btn-box">
                <button type="button">
                    <Link to="/">뒤로가기</Link>
                </button>
                <button type="button" onClick={handleApply}>
                    신청하기
                </button>
            </div>
        </div>
    );
};

export default withRouter(LectureDetail);

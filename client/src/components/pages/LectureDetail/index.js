import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { enrollClass } from '../../../actions/class_action';

import './styles.scss';

//강의내용을 보고 강의신청할수있는 페이지임
const LectureDetail = (props) => {
    const dispatch = useDispatch();
    const [Lecture, setLecture] = useState();
    const lectures = useSelector((state) => state.classReducer.class);
    const role = useSelector((state) => state.userReducer.role);
    const enrollResult = useSelector(
        (state) => state.classReducer.enrollResult,
    );

    const lectureId = props.match.params.id;

    const handleApply = (e) => {
        e.preventDefault();
        if (Lecture.std_count === Lecture.std_max) {
            alert('수강인원이 다 찼습니다.');
        } else {
            dispatch(
                enrollClass({
                    lectureId: lectureId,
                    professorId: Lecture.professor_id,
                }),
            );
        }
    };

    const EnrollBtn = () => {
        return props.user && props.user.role === 2 ? (
            <></>
        ) : (
            <button type="button" onClick={handleApply}>
                신청하기
            </button>
        );
    };

    useEffect(() => {
        if (enrollResult) {
            props.history.push('/');
        }
        if (lectures) {
            lectures.map((lecture) => {
                if (lecture._id === lectureId) {
                    setLecture(lecture);
                    return 0;
                }
            });
        }
    }, [lectures, enrollResult, role]);

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
                        <p className="desc">{Lecture.description}</p>
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
                <EnrollBtn />
            </div>
        </div>
    );
};

export default withRouter(LectureDetail);

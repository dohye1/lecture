import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MiniProfile from '../../partials/MiniProfile';
import MiniLecture from '../../partials/MiniLecture';
import StudentScore from '../../partials/StudentScore';
import ProfessorScore from '../../partials/ProfessorScore';

import './styles.scss';

const ScorePage = (props) => {
    const lectures = useSelector((state) => state.classReducer.class);
    const evaluateResult = useSelector(
        (state) => state.scoreReducer.evaluateResult,
    );
    const [MyLectures, setMyLectures] = useState([]);
    const [SelectedLecture, setSelectedLecture] = useState();
    useEffect(() => {
        if (lectures) {
            if (MyLectures.length === 0) {
                console.log('값이 업데이트됨');
                findLectures(lectures);
            }
        }
    }, [lectures, MyLectures, SelectedLecture, evaluateResult]);

    const findLectures = (lectures) => {
        if (lectures) {
            let lectureArr = lectures.map((lecture) =>
                props.user.role === 1
                    ? props.user.classes.includes(lecture._id)
                    : lecture.professor_id === props.user.id,
            );
            setMyLectures(lectureArr);
        }
    };

    const changeLecture = (e) => {
        e.preventDefault();
        setSelectedLecture(e.target.id);
    };

    const ShowMyLectures = () => {
        return (
            MyLectures &&
            MyLectures.map((lecture, index) => {
                return (
                    lectures && (
                        <MiniLecture
                            key={lecture._id}
                            lecture={lectures[index]}
                            clickEvent={changeLecture}
                        />
                    )
                );
            })
        );
    };

    const ShowStudentScore = () => {
        let selected =
            lectures &&
            lectures.filter((lecture) => lecture._id === SelectedLecture);
        return <StudentScore lecture={selected} />;
    };

    const ShowProfessorScore = () => {
        let selected =
            lectures &&
            lectures.filter((lecture) => lecture._id === SelectedLecture);
        return <ProfessorScore lecture={selected} />;
    };

    return (
        <div className="score-container">
            <div className="show-score-box">
                {props.user && props.user.role === 1 ? (
                    <ShowStudentScore />
                ) : (
                    <ShowProfessorScore />
                )}
            </div>
            <section className="user-info">
                <MiniProfile />
                <h1>나의 강의목록</h1>
                <ShowMyLectures />
            </section>
        </div>
    );
};

export default ScorePage;

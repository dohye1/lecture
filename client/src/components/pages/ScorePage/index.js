import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MiniProfile from '../../partials/MiniProfile';
import MiniLecture from '../../partials/MiniLecture';
import StudentScore from '../../partials/StudentScore';
import ProfessorScore from '../../partials/ProfessorScore';

import './styles.scss';

const ScorePage = (props) => {
    const [IsFirst, setIsFirst] = useState(true);
    const [MyLectures, setMyLectures] = useState([]);
    const [SelectedLecture, setSelectedLecture] = useState();

    const lectures = useSelector((state) => state.classReducer.class);
    const user = useSelector((state) => state.userReducer.user);
    useEffect(() => {
        if (lectures) {
            if (IsFirst) {
                findLectures();
                setIsFirst(false);
            }
        }
    }, [lectures]);

    const findLectures = () => {
        if (lectures) {
            let lectureArr = lectures.map((lecture) =>
                user.role === 1
                    ? user.classes.includes(lecture._id)
                    : lecture.professor_id === user.id,
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
                    lectures &&
                    lecture && (
                        <MiniLecture
                            key={lecture._id + 'preventNaN' + index}
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

export default withRouter(ScorePage, true);

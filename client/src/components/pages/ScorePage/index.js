import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MiniProfile from '../../partials/MiniProfile';
import MiniLecture from '../../partials/MiniLecture';

import './styles.scss';

const ScorePage = (props) => {
    const lectures = useSelector((state) => state.classReducer.class);
    const [MyLectures, setMyLectures] = useState([]);
    let mylectures;
    useEffect(() => {
        if (lectures) {
            if (MyLectures.length === 0) {
                findLectures(lectures);
            }
        }
    }, [lectures, MyLectures]);

    const findLectures = (lectures) => {
        if (lectures) {
            let lectureArr = lectures.map((lecture) =>
                props.user.role === 1
                    ? lecture.students.includes(props.user.id)
                    : lecture.professor_id === props.user.id,
            );
            setMyLectures(lectureArr);
        }
    };

    const ShowMyLectures = () => {
        return (
            MyLectures &&
            MyLectures.map((lecture, index) => {
                if (lecture) {
                    return (
                        <MiniLecture
                            key={lecture._id}
                            lecture={lectures[index]}
                        />
                    );
                }
            })
        );
    };

    return (
        <div className="score-container">
            <div className="show-score-box"></div>
            <section className="user-info">
                <MiniProfile />

                <h1>나의 강의목록</h1>
                <ShowMyLectures />
            </section>
        </div>
    );
};

export default ScorePage;

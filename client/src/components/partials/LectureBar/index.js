import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const LectureBar = ({ lecture }) => {
    return (
        <div className="lecture-container">
            <Link to={`/lecture/${lecture._id}`}>
                <h2 className="title">{lecture.class_title}</h2>
                <div className="lecture-info">
                    <p>
                        {lecture.professor_name} 교수 /{' '}
                        {lecture.class_department}
                    </p>
                    <p>{lecture.class_room}</p>
                    <p>
                        {lecture.start_date} - {lecture.end_date}
                    </p>
                    <p>
                        {lecture.start_time} - {lecture.end_time}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default LectureBar;

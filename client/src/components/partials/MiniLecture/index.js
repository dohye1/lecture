import React from 'react';

import './styles.scss';

const MiniLecture = ({ lecture }) => {
    console.log(lecture);
    return (
        <div className="mini-lecture-container">
            <h4>{lecture.class_title}</h4>
            <p>
                {lecture.professor_name} / {lecture.class_department}
            </p>
        </div>
    );
};

export default MiniLecture;

import React from 'react';

import './styles.scss';

const MiniLecture = ({ lecture, clickEvent }) => {
    return (
        <div
            className="mini-lecture-container"
            onClick={clickEvent}
            id={lecture._id}
            key={lecture._id}
        >
            <h4 id={lecture._id}>{lecture.class_title}</h4>
            <p id={lecture._id}>
                {lecture.professor_name} / {lecture.class_department}
            </p>
        </div>
    );
};

export default MiniLecture;

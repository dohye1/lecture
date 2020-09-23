import React, { useEffect, useState } from 'react';

import './styles.scss';

// 학생스코어박스에는 해당수업에대한 성적을 보여줌
const StudentScore = ({ lecture }) => {
    return (
        <div className="std-score-container">
            <h1>{lecture[0] && lecture[0].class_title}</h1>

            <div className="score-box">
                <div>
                    <p>{}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentScore;

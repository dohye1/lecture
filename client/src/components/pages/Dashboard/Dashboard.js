import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MiniProfile from '../../partials/MiniProfile/MiniProfile';
import LectureBar from '../../partials/LectureBar/LectureBar';
import { myDashboard } from '../../../actions/dashboard_action';

import "./Dashboard.scss";

const Dashboard = ({ role, user }) => {
    const dispatch = useDispatch();
    const [Lectures, setLectures] = useState([]);
    useEffect(() => {
        if (user) {
            dispatch(myDashboard());
        }
    }, [user])

    return (
        <div className="dashboard-container">
            <MiniProfile />
            <div className="lectures">
                <h2>나의 강의</h2>
                {Lectures.length > 0 ? <div>123</div> : <div>{role == 1 ? "개설한 강의가 없습니다" : "신청한 강의가 없습니다"}</div>}
            </div>

        </div>
    )
}

export default withRouter(Dashboard);


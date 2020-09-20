import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MiniProfile from '../../partials/MiniProfile';
import LectureBar from '../../partials/LectureBar';
import { allClass } from '../../../actions/class_action';
import { PlusCircleOutlined } from '@ant-design/icons';

import './styles.scss';

const LandingPage = ({ user }) => {
    const dispatch = useDispatch();
    const [Department, setDepartment] = useState(0);
    const lectures = useSelector((state) => state.classReducer.class);

    useEffect(() => {
        if (lectures === undefined) {
            dispatch(allClass());
        }
    }, [lectures]);

    const ShowLectures = () => {
        return (
            <div className="show-lectures">
                {lectures &&
                    lectures.map((lecture, index) => (
                        <LectureBar lecture={lecture} key={lecture._id} />
                    ))}
            </div>
        );
    };

    return (
        <div className="landing-container">
            <MiniProfile />
            <div className="landing-box">
                <div className="info">
                    <h2>ALL</h2>
                    <div className="lecture-menu">
                        {user && user.role === 2 ? (
                            <div className="add-lecture">
                                <Link to="/open">
                                    <PlusCircleOutlined />
                                    &nbsp;&nbsp;강의 개설
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                        <select
                            name="department"
                            className="select-box"
                            onChange={(e) =>
                                setDepartment(e.currentTarget.value)
                            }
                        >
                            <option value="0">전체대학</option>
                            <option value="1">인문대학</option>
                            <option value="2">사회과학대학</option>
                            <option value="3">자연과학대학</option>
                            <option value="4">경상대학</option>
                            <option value="5">법과대학</option>
                            <option value="6">공과대학</option>
                            <option value="7">농업생명과학대학</option>
                            <option value="8">사범대학</option>
                            <option value="9">예술대학</option>
                            <option value="10">치과대학</option>
                            <option value="11">수의과대학</option>
                            <option value="12">생활과학대학</option>
                            <option value="13">IT대학</option>
                            <option value="14">약학대학</option>
                            <option value="15">행정학부</option>
                        </select>
                    </div>
                </div>

                {lectures !== undefined ? (
                    <ShowLectures />
                ) : (
                    <div>개설된 강의가 없습니다</div>
                )}
            </div>
        </div>
    );
};

export default withRouter(LandingPage);

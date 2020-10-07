import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MiniProfile from '../../partials/MiniProfile';
import LectureBar from '../../partials/LectureBar';
import { allClass } from '../../../actions/class_action';
import { update } from '../../../actions/user_action';
import { PlusCircleOutlined } from '@ant-design/icons';

import './styles.scss';

const departmentArr = [
    'ALL',
    '인문대학',
    '사회과학대학',
    '자연과학대학',
    '경상대학',
    '법과대학',
    '공과대학',
    '농업생명과학대학',
    '사범대학',
    '예술대학',
    '치과대학',
    '수의과대학',
    '생활과학대학',
    'IT대학',
    '약학대학',
    '행정학부',
];

const LandingPage = () => {
    const dispatch = useDispatch();
    const [IsFirst, setIsFirst] = useState(true);
    const [SelectedLecutres, setSelectedLecutres] = useState([]);
    const [Department, setDepartment] = useState('ALL');
    const lectures = useSelector((state) => state.classReducer.class);
    const user = useSelector((state) => state.userReducer.user);

    const changeDepartment = (e) => {
        e.preventDefault();
        setDepartment(departmentArr[e.target.value]);
        if (parseInt(e.target.value) === 0) {
            setIsFirst(true);
        } else {
            const selectedLecutres =
                lectures &&
                lectures.filter((lecture) => {
                    return (
                        lecture.class_department ===
                        departmentArr[e.target.value]
                    );
                });
            setSelectedLecutres(selectedLecutres);
        }
    };

    const ShowLectures = () => {
        return (
            <div className="show-lectures">
                {SelectedLecutres &&
                    SelectedLecutres.map((lecture, index) => (
                        <LectureBar lecture={lecture} key={lecture._id} />
                    ))}
            </div>
        );
    };

    useEffect(() => {
        if (!lectures) {
            dispatch(allClass());
            if (user && user.role === 1) {
                dispatch(update());
            }
        } else if (IsFirst) {
            setSelectedLecutres(lectures);
            setIsFirst(false);
        }
    }, [lectures, IsFirst]);

    return (
        <div className="landing-container">
            <MiniProfile />
            <div className="landing-box">
                <div className="info">
                    <h2>{Department}</h2>
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
                            onChange={changeDepartment}
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

                {SelectedLecutres ? (
                    <ShowLectures />
                ) : (
                    <div>개설된 강의가 없습니다</div>
                )}
            </div>
        </div>
    );
};

export default withRouter(LandingPage);

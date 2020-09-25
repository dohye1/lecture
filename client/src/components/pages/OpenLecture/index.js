import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TimePicker, DatePicker, Space } from 'antd';
import { newClass } from '../../../actions/class_action';

import './styles.scss';

const OpenLecture = (props) => {
    const dispatch = useDispatch();
    const [CountBox, setCountBox] = useState(1);
    const [ScoreBox, setScoreBox] = useState([true]);
    const [BoxText, setBoxText] = useState(['']);
    const [Date, setDate] = useState();
    const [Time, setTime] = useState();
    const newClassResult = useSelector(
        (state) => state.classReducer.newClassResult,
    );
    const ScoreBoard = () => {
        return ScoreBox.map(
            (item, index) => item && <Box index={index} key={index} />,
        );
    };

    const handleChange = (e) => {
        let boxText = BoxText;
        boxText[e.target.id] = e.target.value;
        setBoxText([...boxText]);
    };

    const clickDeleteScoreBoard = (e) => {
        if (CountBox == 1) {
            alert('평가항목을 적어도 1가지는 입력해야 합니다.');
            return;
        }
        setCountBox(CountBox - 1);
        let arr = ScoreBox;
        arr[e.target.id] = false;
        setScoreBox([...arr]);
    };

    // 문제
    // 1. 영어입력에는 문제가 없는데 한글로 입력하면 문제발생
    // 2. 맨 마지막 input에 focus가 잡힘
    const Box = ({ index }) => {
        return (
            <div className="score-box-each">
                <div className="score-input-box">
                    <label htmlFor="item">평가 항목</label>
                    <input
                        type="text"
                        id={index}
                        name="item"
                        autoFocus
                        value={BoxText[index]}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="button"
                    id={index}
                    onClick={clickDeleteScoreBoard}
                >
                    평가항목 삭제하기
                </button>
            </div>
        );
    };

    const clickAddScoreBoard = () => {
        setCountBox(CountBox + 1);
        setScoreBox([...ScoreBox, true]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lectureData = {
            title: e.target.title.value,
            room: e.target.room.value,
            maxNum: e.target.maxNum.value,
            date: Date,
            time: Time,
            description: e.target.description.value,
            scoreArr: ScoreBox,
            scoreText: BoxText,
        };

        dispatch(newClass(lectureData));
    };

    useEffect(() => {
        if (newClassResult) {
            props.history.push('/');
        }
    }, [ScoreBox, BoxText, newClassResult]);

    return (
        <div className="open-container">
            <h2>강의 개설하기</h2>
            <form className="input-form" onSubmit={handleSubmit}>
                <div className="input-box">
                    <label htmlFor="title">강의명</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="short-box">
                    <div className="input-box">
                        <label htmlFor="room">강의실</label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="maxNum">수강인원(명)</label>
                        <input
                            type="text"
                            id="maxNum"
                            name="maxNum"
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>

                <div className="input-box label-margin">
                    <label htmlFor="title">개강, 종강 날짜</label>
                    <DatePicker.RangePicker
                        onChange={(_, date) => setDate(date)}
                        format="YYYY/MM/DD"
                    />
                </div>
                <div className="input-box label-margin">
                    <label htmlFor="title">강의 시간</label>
                    <TimePicker.RangePicker
                        onChange={(_, time) => setTime(time)}
                        format="HH:mm"
                    />
                </div>

                <div className="input-box label-margin">
                    <label htmlFor="description">수업 소개</label>
                    <textarea name="description"></textarea>
                </div>
                <div className="score-box">
                    <h3>수료기준 설정</h3>
                    <p>
                        - 평가 항목을 설정해 주세요 ( ex ) midterm, finalterm,
                        test... )<br />
                        - 평가 항목은 최소 1개를 설정해야 합니다
                        <br />- 영어로 입력해 주세요
                    </p>
                    <ScoreBoard />
                    {CountBox > 4 ? (
                        <div></div>
                    ) : (
                        <button type="button" onClick={clickAddScoreBoard}>
                            평가항목 추가하기
                        </button>
                    )}
                </div>
                <div className="btn-box">
                    <button type="reset">
                        <Link to="/">뒤로가기</Link>
                    </button>
                    <button type="submit">개설하기</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(OpenLecture);

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TimePicker, DatePicker } from 'antd';
import { newClass } from '../../../actions/class_action';

import './styles.scss';

const OpenLecture = (props) => {
    const dispatch = useDispatch();
    let boxText0 = useRef();
    let boxText1 = useRef();
    let boxText2 = useRef();
    let boxText3 = useRef();
    let boxText4 = useRef();

    const [CountBox, setCountBox] = useState(0);
    const [ScoreBox, setScoreBox] = useState([
        'block',
        'none',
        'none',
        'none',
        'none',
    ]);
    const [BoxText, setBoxText] = useState(['', '', '', '', '']);
    const [Date, setDate] = useState();
    const [Time, setTime] = useState();
    const newClassResult = useSelector(
        (state) => state.classReducer.newClassResult,
    );

    const clickDeleteScoreBoard = () => {
        if (CountBox <= 0) {
            alert('평가항목을 적어도 1가지는 입력해야 합니다.');
            setCountBox(0);
            return;
        }
        let temp = ScoreBox;
        let tempText = BoxText;
        temp[CountBox] = 'none';
        tempText[CountBox] = '';
        setBoxText(tempText);
        setCountBox(CountBox - 1);
        setScoreBox(temp);
    };

    const clickAddScoreBoard = () => {
        if (CountBox >= 4) {
            alert('평가항목 최대 5개까지 입력 할 수 있습니다.');
            setCountBox(4);
            return;
        }
        let temp = ScoreBox;
        setBoxText([
            boxText0.current.value,
            boxText1.current.value,
            boxText2.current.value,
            boxText3.current.value,
            boxText4.current.value,
        ]);
        temp[CountBox + 1] = 'block';
        setCountBox(CountBox + 1);
        setScoreBox(temp);
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
    }, [newClassResult]);

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
                        - 평가 항목을 설정해 주세요 ( ex ) 중간고사, 기말고사,
                        과제... )<br />- 평가 항목은 최소 1개를 설정해야 합니다
                    </p>
                    <div
                        className="score-box-each"
                        style={{ display: ScoreBox[0] }}
                    >
                        <div className="score-input-box">
                            <label htmlFor="item">평가 항목</label>
                            <input
                                type="text"
                                name="item"
                                ref={boxText0}
                                defaultValue={BoxText[0]}
                            />
                        </div>
                    </div>
                    <div
                        className="score-box-each"
                        style={{ display: ScoreBox[1] }}
                    >
                        <div className="score-input-box">
                            <label htmlFor="item">평가 항목</label>
                            <input
                                type="text"
                                name="item"
                                ref={boxText1}
                                defaultValue={BoxText[1]}
                            />
                        </div>
                    </div>
                    <div
                        className="score-box-each"
                        style={{ display: ScoreBox[2] }}
                    >
                        <div className="score-input-box">
                            <label htmlFor="item">평가 항목</label>
                            <input
                                type="text"
                                name="item"
                                ref={boxText2}
                                defaultValue={BoxText[2]}
                            />
                        </div>
                    </div>
                    <div
                        className="score-box-each"
                        style={{ display: ScoreBox[3] }}
                    >
                        <div className="score-input-box">
                            <label htmlFor="item">평가 항목</label>
                            <input
                                type="text"
                                name="item"
                                ref={boxText3}
                                defaultValue={BoxText[3]}
                            />
                        </div>
                    </div>
                    <div
                        className="score-box-each"
                        style={{ display: ScoreBox[4] }}
                    >
                        <div className="score-input-box">
                            <label htmlFor="item">평가 항목</label>
                            <input
                                type="text"
                                name="item"
                                ref={boxText4}
                                defaultValue={BoxText[4]}
                            />
                        </div>
                    </div>
                    <>
                        <button type="button" onClick={clickAddScoreBoard}>
                            평가항목 추가하기
                        </button>
                        <button type="button" onClick={clickDeleteScoreBoard}>
                            평가항목 삭제하기
                        </button>
                    </>
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

import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TimePicker, DatePicker, Space } from 'antd';
import "./OpenLecture.scss";

const OpenLecture = () => {
    const [CountBox, setCountBox] = useState(1);
    const [ScoreBox, setScoreBox] = useState([true]);
    const [BoxText, setBoxText] = useState(['']);


    const ScoreBoard = () => {
        return (
            ScoreBox.map((item, index) => item && <Box index={index} key={index} />)
        )
    }

    const handleChange = (e) => {
        let boxText = BoxText;
        boxText[e.target.id] = e.target.value;
        setBoxText([...boxText]);
    }

    const clickDeleteScoreBoard = (e) => {
        if (CountBox == 1) {
            alert('평가항목을 적어도 1가지는 입력해야 합니다.');
            return;
        }
        setCountBox(CountBox - 1);
        let arr = ScoreBox;
        arr[e.target.id] = false;
        setScoreBox([...arr]);
    }

    const Box = ({ index }) => {
        return <div className="score-box">
            <div className="score-input-box">
                <label htmlFor="item">평가 항목</label>
                <input type="text" id={index} name="item" autoFocus value={BoxText[index]} onChange={handleChange} />
            </div>
            <button id={index} onClick={clickDeleteScoreBoard}>평가항목 삭제하기{index}</button>
        </div>
    }

    const clickAddScoreBoard = () => {
        setCountBox(CountBox + 1);
        setScoreBox([...ScoreBox, true])
    }

    useEffect(() => {
        console.log('몇개있어?', CountBox)
        console.log(ScoreBox);
        console.log(BoxText);

    }, [ScoreBox, BoxText])

    return (
        <div className="open-container">
            <h2>강의 개설하기</h2>
            <form className="input-form">
                <div className="input-box">
                    <label htmlFor="title">강의명</label>
                    <input type="text" id="title" name="title" autoComplete="off" required />
                </div>
                <div className="short-box">
                    <div className="input-box">
                        <label htmlFor="room">강의실</label>
                        <input type="text" id="room" name="room" autoComplete="off" required />
                    </div>
                    <div className="input-box">
                        <label htmlFor="max-num">수강인원</label>
                        <input type="text" id="max-num" name="max-num" autoComplete="off" required />
                    </div>
                </div>

                <div className="input-box label-margin">
                    <label htmlFor="title">개강, 종강 날짜</label>
                    < DatePicker.RangePicker />
                </div>
                <div className="input-box label-margin">
                    <label htmlFor="title">강의 시간</label>
                    <TimePicker.RangePicker />
                </div>

                <div className="input-box label-margin">
                    <label htmlFor="description">수업 소개</label>
                    <textarea name="description"></textarea>
                </div>
                <div className="score-box">
                    <h3>수료기준 설정</h3>
                    <p>평가 항목을 설정해 주세요  ( ex ) midterm, finalterm, test... )<br />
                    평가 항목은 최소 1개를 설정해야 합니다</p>
                    <ScoreBoard />
                    {CountBox > 4 ? <div></div> : <button onClick={clickAddScoreBoard}>평가항목 추가하기</button>}
                </div>
            </form>
        </div >
    )
}

export default withRouter(OpenLecture);
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TimePicker, DatePicker } from 'antd';
import { editClass } from '../../../actions/class_action';

import './styles.scss';

const EditLecture = (props) => {
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
    const [ThisLecture, setThisLecture] = useState();
    const editClassResult = useSelector(
        (state) => state.classReducer.editClassResult,
    );
    const lectures = useSelector((state) => state.classReducer.class);
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
if(!Date){
alert('강의 일정을 설정해 주세요');
return;
}if(!Time){
alert('강의 시간을 설정해 주세요');
return;
}
        const lectureData = {
            lectureId:props.history.location.state.lectureId,
            room: e.target.room.value,
            maxNum: e.target.maxNum.value,
            date: Date,
            time: Time,
            description: e.target.description.value,
            scoreArr: ScoreBox,
            scoreText: [
                boxText0.current.value,
                boxText1.current.value,
                boxText2.current.value,
                boxText3.current.value,
                boxText4.current.value,
            ],
        };

        dispatch(editClass(lectureData));
    };

    useEffect(() => {
        console.log(ThisLecture);
        if (ThisLecture == undefined) {
            lectures &&
                lectures.map((lecture) => {
                    if (
                        lecture._id === props.history.location.state.lectureId
                    ) {
                        setThisLecture(lecture);
                        setBoxText(lecture.score_title);
                        let plate=[];
                        for (let i = 0; i < 5; i++) {
                            if (lecture.score_title[i]) {
                                plate = [...plate, 'block'];
                            } else {
                                plate = [...plate, 'none'];
                            }
                        }
                        setScoreBox(plate);
                        setCountBox(lecture.score_title.length-1);
                    }
                });
        }
        if (editClassResult) {
            props.history.push('/');
        }
    }, [lectures, ThisLecture,editClassResult]);

    return (
        <div className="open-container">
            <h2>강의 수정하기</h2>
            <form className="input-form" onSubmit={handleSubmit}>
                <div className="input-box">
                    <label htmlFor="title">강의명</label>
                    <p>{ThisLecture && ThisLecture.class_title}</p>
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
                            defaultValue={ThisLecture && ThisLecture.class_room}
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
                            defaultValue={ThisLecture && ThisLecture.std_max}
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
                    <textarea
                        name="description"
                        defaultValue={ThisLecture && ThisLecture.description}
                    ></textarea>
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
                    <button type="submit">수정하기</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(EditLecture);

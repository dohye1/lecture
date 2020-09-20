import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../../actions/user_action';

import './styles.scss';

const Register = (props) => {
    const dispatch = useDispatch();
    const registerResult = useSelector((state) => state.userReducer.register);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Department, setDepartment] = useState(0);
    const [IdNum, setIdNum] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Role, setRole] = useState(1);

    const [EmailCss, setEmailCss] = useState('');
    const [NameCss, setNameCss] = useState('');
    const [PwCss, setPwCss] = useState('');
    const [IdNumCss, setIdNumCss] = useState('');
    const [ConfirmPwCss, setConfirmPwCss] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        if (Email == '') {
            setEmailCss('warning');
            setTimeout(() => setEmailCss(''), 1500);
        }
        if (Password == '') {
            setPwCss('warning');
            setTimeout(() => setPwCss(''), 1500);
        }
        if (Name == '') {
            setNameCss('warning');
            setTimeout(() => setNameCss(''), 1500);
        }
        if (IdNum == '') {
            setIdNumCss('warning');
            setTimeout(() => setIdNumCss(''), 1500);
        }
        if (ConfirmPassword == '') {
            setConfirmPwCss('warning');
            setTimeout(() => setConfirmPwCss(''), 1500);
        }
        if (
            (Email !== '' &&
                Password !== '' &&
                Name !== '' &&
                IdNum !== '' &&
                ConfirmPassword !== '',
            Department !== 0,
            Role !== '')
        ) {
            dispatch(
                register({
                    Email,
                    Password,
                    Name,
                    IdNum,
                    ConfirmPassword,
                    Department,
                    Role,
                }),
            );
        }
    };

    const handlePw = (e) => {
        if (e.currentTarget.value !== Password) {
            setConfirmPwCss('warning');
        } else {
            setConfirmPassword(e.currentTarget.value);
            setConfirmPwCss('');
        }
    };

    useEffect(() => {
        if (registerResult) {
            props.history.push('/login');
        }
    }, [EmailCss, registerResult]);

    return (
        <div className="register-container">
            <h1>REGISTER</h1>
            <section className="register-form">
                <form>
                    <div className="input-box">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="off"
                            required
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                        <label htmlFor="email" className={EmailCss}>
                            EMAIL
                        </label>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            required
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                        <label htmlFor="name" className={NameCss}>
                            NAME
                        </label>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="pw"
                            id="pw"
                            autoComplete="off"
                            required
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <label htmlFor="pw" className={PwCss}>
                            PASSWORD
                        </label>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="confirm-pw"
                            id="confirm-pw"
                            autoComplete="off"
                            required
                            onChange={handlePw}
                        />
                        <label htmlFor="confirm-pw" className={ConfirmPwCss}>
                            CONFIRM PASSWORD
                        </label>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="id_num"
                            id="id_num"
                            autoComplete="off"
                            required
                            onChange={(e) => setIdNum(e.currentTarget.value)}
                        />
                        <label htmlFor="id_num" className={IdNumCss}>
                            ID NUM
                        </label>
                    </div>

                    <select
                        name="department"
                        className="select-box"
                        onChange={(e) => setDepartment(e.currentTarget.value)}
                    >
                        <option value="0">소속대학</option>
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

                    <div className="radio-box">
                        <input
                            type="radio"
                            id="role_stu"
                            name="role"
                            value="1"
                            onClick={(e) => setRole(e.currentTarget.value)}
                            defaultChecked
                        />
                        <label htmlFor="role_stu">STUDENT</label>
                        <input
                            type="radio"
                            id="role_pro"
                            name="role"
                            value="2"
                            onClick={(e) => setRole(e.currentTarget.value)}
                        />
                        <label htmlFor="role_pro">PROFESSOR</label>
                    </div>

                    <div className="submit-btn">
                        <button type="submit" onClick={handleClick}>
                            REGISTER
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default withRouter(Register);

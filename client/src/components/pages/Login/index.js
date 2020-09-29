import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../../actions/user_action';

import './styles.scss';

const Login = () => {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [EmailCss, setEmailCss] = useState('');
    const [PwCss, setPwCss] = useState('');
    let loginResult = useSelector((state) => state.userReducer.login);

    const handleClick = (e) => {
        e.preventDefault();
        if (Email === '') {
            setEmailCss('warning');
            setTimeout(() => setEmailCss(''), 1500);
        }
        if (Password === '') {
            setPwCss('warning');
            setTimeout(() => setPwCss(''), 1500);
        }
        if (Email !== '' && Password !== '') {
            dispatch(login(Email, Password));
        }
    };

    useEffect(() => {
        if (loginResult === false) {
            alert('login에 실패했습니다.');
        }
    }, [EmailCss, loginResult]);
    return (
        <div className="login-container">
            <h1>LOG IN</h1>
            <section className="login-form">
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
                    <div className="submit-btn">
                        <button type="submit" onClick={handleClick}>
                            LOGIN
                        </button>
                    </div>
                </form>
                <div className="caption">
                    <p>
                        <Link to="/">Forget Password?</Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default withRouter(Login);

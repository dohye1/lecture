import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/user_action';
import './styles.scss';

const Nav = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const logoutResult = useSelector((state) => state.userReducer.logout);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (logoutResult) {
            window.location.reload();
        }
    }, [logoutResult]);
    const NavMenu = () => {
        return isAuth ? (
            <ul className="nav-menu_user nav-menu">
                <li>
                    <Link to="/" className="kor">
                        강의
                    </Link>
                </li>
                <li>
                    <Link to="/score" className="kor">
                        성적관리
                    </Link>
                </li>
                <li>
                    <Link to="/" className="eng">
                        PROFILE
                    </Link>
                </li>
                <li>
                    <Link to="/" className="eng" onClick={handleLogout}>
                        LOGOUT
                    </Link>
                </li>
            </ul>
        ) : (
            <ul className="nav-menu_all nav-menu">
                <li>
                    <Link to="/register" className="eng">
                        REGISTER
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="eng">
                        LOGIN
                    </Link>
                </li>
            </ul>
        );
    };

    return (
        <div className="nav-container">
            <div className="logo">
                <Link to="/"> Conocimiento</Link>
            </div>
            <div className="empty-box"></div>
            <NavMenu />
        </div>
    );
};

export default Nav;

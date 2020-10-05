import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user_action';

const withAuth = (SpecificComponent, option, isProf = null) => {
    // option
    // null > user의 유무에 상관없이 항상 들어올수있는 페이지
    // true > user만 들어올수있음
    // false > user는 들어올수없음
    return (props) => {
        const dispatch = useDispatch();
        const isAuth = useSelector((state) => state.userReducer.isAuth);
        const user = useSelector((state) => state.userReducer.user);

        useEffect(() => {
            if (isAuth === undefined) {
                dispatch(auth());
            }
            if (isAuth) {
                // user가 있을떄
                if (!option) {
                    props.history.push('/');
                }
            } else {
                // user가 없을떄
                if (option) {
                    props.history.push('/login');
                }
            }
        }, [isAuth]);

        return <SpecificComponent user={user} />;
    };
};

export default withAuth;

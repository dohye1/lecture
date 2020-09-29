import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const MiniProfile = () => {
    const user = useSelector((state) => state.userReducer.user);
    return (
        <div className="mini-container">
            {user && (
                <>
                    <h3>
                        {user.name}
                        <span>님</span>
                    </h3>
                    <p>{user.email}</p>
                    <p>
                        {user.department} / {user.role === 1 ? '학생' : '교수'}
                    </p>
                </>
            )}
        </div>
    );
};

export default MiniProfile;

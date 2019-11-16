import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { logout } from '../../../store/auth/actions';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.auth.user)!;

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    return (
        <>
            <h1>Hello, {user.fullName}, {user.id}</h1>
            <button onClick={handleLogoutClick}>Logout</button>
        </>
    );
};

export default Home;

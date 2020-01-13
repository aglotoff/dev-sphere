import React from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../common/Header/Header';

import { getUser } from '../../../store/actions/api';

const Home: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Header />

            <button onClick={() => dispatch(getUser())}>Test!</button>
        </>
    );
};

export default Home;

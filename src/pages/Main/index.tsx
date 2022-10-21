import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { UserMap } from '../../shared/constants/localStorageMap';

export const Main: React.FC = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const localUsername = localStorage.getItem(UserMap.USERNAME);
        if (localUsername) {
            setUsername(localUsername);
        }
    }, []);

    return (
        <div>
            <Header username={username} setUsername={setUsername} />
            <Outlet context={{ setUsername }} />
        </div>
    );
};

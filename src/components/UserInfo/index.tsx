import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../apollo/queries/GetMe';
import { useNavigate } from 'react-router-dom';

import style from './UserInfo.module.scss';

export const UserInfo: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ME);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (data?.getMe === null) {
            navigate('/');
        }
    }, [data, navigate]);

    if (loading || data?.getMe === null) {
        return <div>loading...</div>;
    }

    return (
        <div className={style.info}>
            <h2>My profile</h2>
            <div>
                <p>ID: {data.getMe.id}. </p>
                <p>Name: {data.getMe.name}</p>
            </div>
        </div>
    );
};

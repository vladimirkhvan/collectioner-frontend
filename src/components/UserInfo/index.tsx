import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../apollo/queries/GetMe';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <div>
                <span>{data.getMe.id}. </span>
                <span>{data.getMe.name}</span>
            </div>
        </div>
    );
};

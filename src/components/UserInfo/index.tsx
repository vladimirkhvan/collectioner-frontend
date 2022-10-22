import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../apollo/queries/GetMe';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const UserInfo: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ME);
    const navigate = useNavigate();

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>error occured</div>;
    }

    if(data.getMe === null){
        navigate('/');
        return <div>error occured</div>;
    } 

    return (
        <div>
            <span>{data.getMe.id}. </span>
            <span>{data.getMe.name}</span>
            
            <Button variant="outlined">create collection</Button>

        </div>
    );
};

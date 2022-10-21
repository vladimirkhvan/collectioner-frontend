import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../apollo/queries/GetMe';

export const UserInfo: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ME);

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>error occured</div>;
    }

    console.log(data.getMe);

    return <div>{data.getMe}</div>;
};

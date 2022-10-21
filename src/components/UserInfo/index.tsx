import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../apollo/queries/GetMe';

export const UserInfo: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ME);
    return <div>UserInfo</div>;
};

import React from 'react';
import { CollectionForm } from '../../components/CollectionForm';
import { UserInfo } from '../../components/UserInfo';

export const User: React.FC = () => {

    return <div>
        <UserInfo/>
        <CollectionForm/>
    </div>;
};

import React from 'react';
import { CollectionForm } from '../../components/CollectionForm';
import { ThemeForm } from '../../components/ThemeForm';
import { UserInfo } from '../../components/UserInfo';

import style from './User.module.scss'

export const User: React.FC = () => {
    return (
        <div>
            <div className={style.info}>
                <UserInfo />
            </div>
            <div className={style.forms}>
                <CollectionForm />
                <ThemeForm />
            </div>
        </div>
    );
};

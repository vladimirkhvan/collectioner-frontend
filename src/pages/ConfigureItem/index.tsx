import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemForm } from '../../components/ItemForm';

import style from './ConfigureItem.module.scss';

export const ConfigureItem: React.FC = () => {
    const { id } = useParams();

    return (
        <div className={style.configureItem}>
            <ItemForm collection_id={id} />
        </div>
    );
};

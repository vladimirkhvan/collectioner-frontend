import { Switch } from '@mui/material';
import React from 'react';
import style from './Header.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <span>colle.</span>
            <Switch
                // checked={checked}
                // onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </header>
    );
};

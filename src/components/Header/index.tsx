import { Search } from '@mui/icons-material';
import { IconButton, Switch, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

interface HeaderProps {
    username: string;
}

export const Header: React.FC<HeaderProps> = ({username}) => {
    
    return (
        <header className={style.header}>
            <Link to="/">colle.</Link>
            <Switch
                // checked={checked}
                // onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>
            {username ? (
                <div>{username}</div>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Register</Link>
                </>
            )}
        </header>
    );
};

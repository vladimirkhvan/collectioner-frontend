import { Search } from '@mui/icons-material';
import { IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../apollo/mutations/Logout';
import { UserMap } from '../../shared/constants/localStorageMap';

interface HeaderProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ username, setUsername }) => {
    const [logout, { error, data }] = useMutation(LOGOUT);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            localStorage.removeItem(UserMap.USERNAME);
            setUsername('');
        }
    }, [data]);

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
                <>
                    <Link to = '/me'>{username}</Link>
                    <Tooltip title="Logout">
                        <IconButton onClick={() => logout()}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Register</Link>
                </>
            )}
        </header>
    );
};

import React from 'react';

import { Box } from '@mui/material';
import { LoginForm } from '../../components/LoginForm';

import style from './Login.module.scss';

import character from '../../assets/images/character.png';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
    return (
        <Box className={style.authentication}>
            <main>
                <div className={style.infoBlock}>
                    <h1>
                        Sign In to <br />
                        Create Collection
                    </h1>
                    <p className={style.hideSmall}>
                        if you don’t an account <br />
                        you can <Link to="/registration">Register here!</Link>
                    </p>
                </div>
                <img
                    src={character}
                    alt="character"
                    width={545}
                    className={`${style.hideSmall} ${style.character}`}
                />

                <LoginForm />
            </main>
        </Box>
    );
};

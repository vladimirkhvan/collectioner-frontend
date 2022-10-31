import React from 'react';
import style from './Registration.module.scss';

import { Box } from '@mui/material';

import { RegisterForm } from '../../components/RegisterForm';

import character from '../../assets/images/character.png';
import { Link } from 'react-router-dom';

export const Registration: React.FC = () => {
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

                <RegisterForm />
            </main>
        </Box>
    );
};

export default Registration;

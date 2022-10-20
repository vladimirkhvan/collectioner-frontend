import React from 'react';
import style from './Registration.module.scss';

import { Box } from '@mui/material';

import { RegisterForm } from '../../components/RegisterForm';

export const Registration: React.FC = () => {
    return (
        <Box sx={{display:'flex', justifyContent: 'center'}}>
            <RegisterForm />
        </Box>
    );
};

export default Registration;

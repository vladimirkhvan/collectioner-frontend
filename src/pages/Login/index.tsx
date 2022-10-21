import React from 'react';

import { Box } from '@mui/material';
import { LoginForm } from '../../components/LoginForm';

export const Login:React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LoginForm/>
        </Box>
    );
};

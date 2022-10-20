import React from 'react';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';

export const Registration: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ width: '300px', height: '200px' }}
                    label="Outlined"
                    variant="outlined"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <TextField
                    sx={{ width: '300px', height: '200px' }}
                    label="Outlined"
                    variant="outlined"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <TextField
                    sx={{ width: '300px', height: '200px' }}
                    label="Outlined"
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type='submit'>submit.</button>
            </form>
        </Box>
    );
};

export default Registration;

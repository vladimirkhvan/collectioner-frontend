import React from 'react';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';

import style from './RegisterForm.module.scss';

import { REGISTER } from '../../apollo/mutations/Register';
import { RegisterSchema } from './RegisterSchema';

export const RegisterForm: React.FC = () => {
    const [createUser, { error }] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            createUser({ variables: { input: {...values} } });
            error && console.error(error);
        },
    });

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <form className={style.registerForm} onSubmit={formik.handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <button type="submit">submit.</button>
            </form>
        </Box>
    );
};

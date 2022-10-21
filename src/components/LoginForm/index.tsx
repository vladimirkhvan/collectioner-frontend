import React, {useEffect} from 'react';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';

import style from './LoginForm.module.scss';

import { LOGIN } from '../../apollo/mutations/Login';
import { LoginSchema } from './LoginSchema';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {

    const [login, { error, data }] = useMutation(LOGIN);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            login({ variables: { input: {...values} } });
        },
    });

    useEffect(() => {
        if(error){
            console.log(error);
        }
    }, [error])

    useEffect(() => {
        if(data){
            navigate('/')
        }
    }, [data, navigate])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <form className={style.loginForm} onSubmit={formik.handleSubmit}>
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

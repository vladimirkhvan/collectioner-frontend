import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_THEME } from '../../apollo/mutations/CreateTheme';
import { useFormik } from 'formik';
import { ThemeSchema } from './ThemeSchema';

import style from './ThemeForm.module.scss';
import { Box, TextField } from '@mui/material';

export const ThemeForm: React.FC = () => {
    const [createTheme, { error, data }] = useMutation(CREATE_THEME);
    const formik = useFormik({
        initialValues: {
            label: '',
        },
        validationSchema: ThemeSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            createTheme({ variables: { input: { ...values } } });
            error && console.error(error);
        },
    });

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            console.log('success');
        }
    }, [data]);

    return (
        <Box className={style.theme}>
            <h2>Create theme</h2>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <TextField
                    className={style.formInput}
                    label="Name"
                    variant="outlined"
                    name="label"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.label}
                    error={formik.touched.label && Boolean(formik.errors.label)}
                    helperText={formik.touched.label && formik.errors.label}
                />
                <button type="submit">submit.</button>
            </form>
        </Box>
    );
};

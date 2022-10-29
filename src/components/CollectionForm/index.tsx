import React, { useEffect } from 'react';
import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COLLECTION } from '../../apollo/mutations/CreateCollection';
import { useFormik } from 'formik';
import { CollectionSchema } from './CollectionSchema';
import MDEditor from '@uiw/react-md-editor';

import style from './CollectionForm.module.scss';
import { uploadImage } from '../../utils/uploadImage';
import { GET_THEMES } from '../../apollo/queries/GetThemes';

export const CollectionForm: React.FC = () => {
    const [createCollection, { error: collectionError, data: collectionData }] =
        useMutation(CREATE_COLLECTION);
    const { loading: themeLoading, error: themeError, data: themeData } = useQuery(GET_THEMES);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            theme: { label: 'none', id: 1 },
            image: null,
        },
        validationSchema: CollectionSchema,
        onSubmit: (values) => {
            try {
                (async () => {
                    const imageUrl = await uploadImage(values.image);
                    createCollection({
                        variables: {
                            input: { ...values, theme: values.theme.id, image: imageUrl },
                        },
                    });
                    collectionError && console.error(collectionError);
                })();
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (collectionError) {
            console.log(collectionError);
        }
    }, [collectionError]);

    useEffect(() => {
        if (collectionData) {
            console.log('success');
        }
    }, [collectionData]);

    useEffect(() => {
        if (themeError) {
            console.log(themeError);
        }
    }, [themeError]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <form className={style.form} onSubmit={formik.handleSubmit}>
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
                <Box>
                    <MDEditor
                        value={formik.values.description}
                        onChange={(value) => formik.setFieldValue('description', value)}
                    />
                </Box>
                <Box>
                    <label>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                                formik.setFieldValue('image', event.currentTarget.files[0])
                            }
                        />
                    </label>
                </Box>
                {themeLoading && !themeError ? (
                    <CircularProgress disableShrink />
                ) : (
                    <Autocomplete
                        disablePortal
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={formik.values.theme}
                        onChange={(_, newValue: { label: string; id: number }) => {
                            formik.setFieldValue('theme', newValue);
                        }}
                        options={themeData.getThemes}
                        renderInput={(params) => (
                            <TextField {...params} name="theme" label="Controllable" />
                        )}
                    />
                )}

                <Button variant="outlined" type="submit">
                    create collection
                </Button>
            </form>
        </Box>
    );
};

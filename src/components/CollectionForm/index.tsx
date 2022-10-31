import React, { useEffect, useState, useRef } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    TextField,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COLLECTION } from '../../apollo/mutations/CreateCollection';
import { useFormik } from 'formik';
import { CollectionSchema } from './CollectionSchema';
import MDEditor from '@uiw/react-md-editor';

import style from './CollectionForm.module.scss';
import { uploadImage } from '../../utils/uploadImage';
import { GET_THEMES } from '../../apollo/queries/GetThemes';
import { ExpandMore } from '@mui/icons-material';
import { TYPES } from '../../shared/constants/enums';

export const CollectionForm: React.FC = () => {
    const [createCollection, { error: collectionError, data: collectionData }] =
        useMutation(CREATE_COLLECTION);
    const { loading: themeLoading, error: themeError, data: themeData } = useQuery(GET_THEMES);

    const [customFields, setCustomFields] = useState([]);
    const fieldId = useRef(0);

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
                            input: {
                                ...values,
                                theme: values.theme.id,
                                image: imageUrl,
                                fields: customFields
                                    .filter((field) => field.attribute !== null)
                                    .map((field) => ({
                                        attribute: field.attribute,
                                        attribute_type: field.attribute_type,
                                    })),
                            },
                        },
                    });
                    collectionError && console.error(collectionError);
                })();
            } catch (error) {
                console.error(error);
            }
        },
    });

    const onCreateField = (attribute_type: TYPES) => {
        fieldId.current += 1;
        setCustomFields((prevCustomFields) => [
            ...prevCustomFields,
            { attribute: null, attribute_type, localId: fieldId.current },
        ]);
    };

    const onChangeField = (event, index) => {
        setCustomFields((prevCustomFields) => {
            prevCustomFields[index].attribute = event.target.value;
            return prevCustomFields;
        });
    };

    const fields = customFields.map((field, index) => (
        <TextField
            className={style.formInput}
            label={`for ${field.attribute_type.toLowerCase()}.`}
            variant="outlined"
            onChange={(event) => onChangeField(event, index)}
            key={field.localId}
        />
    ));

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
        <Box className={style.collection}>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <h2>create collection</h2>
                <TextField
                    className={style.formInput}
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
                        className={style.editor}
                        value={formik.values.description}
                        onChange={(value) => formik.setFieldValue('description', value)}
                    />
                </Box>
                <Box>
                    <label className={style.addImage}>
                        add image
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
                        className={style.autocomplete}
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
                <Accordion className={style.accordion}>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
                        Option Fields
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={style.pills}>
                            <button onClick={() => onCreateField(TYPES.BOOLEAN)} type='button'>boolean</button>
                            <button onClick={() => onCreateField(TYPES.NUMBER)} type='button'>number</button>
                            <button onClick={() => onCreateField(TYPES.TEXT)} type='button'>text</button>
                            <button onClick={() => onCreateField(TYPES.STRING)} type='button'>string</button>
                            <button onClick={() => onCreateField(TYPES.DATE)} type='button'>date</button>
                        </div>

                        {fields}
                    </AccordionDetails>
                </Accordion>

                <button type="submit" className={style.createButton}>
                    create collection
                </button>
            </form>
        </Box>
    );
};

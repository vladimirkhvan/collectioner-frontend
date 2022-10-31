import { useMutation, useQuery } from '@apollo/client';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControlLabel,
    Switch,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { CREATE_ITEM } from '../../apollo/mutations/CreateItem';
import { ItemSchema } from './ItemSchema';
import style from './ItemForm.module.scss';
import { GET_TAGS } from '../../apollo/queries/GetTags';
import { GET_CUSTOM_FIELDS } from '../../apollo/queries/GetCustomFields';
import { TYPES } from '../../shared/constants/enums';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const ItemForm: React.FC<{ collection_id: string }> = ({ collection_id }) => {
    const [createItem, { error, data }] = useMutation(CREATE_ITEM);
    const { loading, error: tagsError, data: tags } = useQuery(GET_TAGS);
    const { loading: fieldsLoading, data: fields } = useQuery(GET_CUSTOM_FIELDS, {
        variables: {
            collection_id,
        },
    });
    const [customFields, setCustomFields] = useState({});
    const [isSet, setIsSet] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: ItemSchema,
        onSubmit: (values) => {
            const tags = tagsValue.map((tag) => tag.label);
            const customFieldsValues = fields.getCustomFields.map((field) => {
                const fieldValue = customFields[field.id].hasOwnProperty('date_value')
                    ? {
                          date_value: `${customFields[field.id].date_value.$d}`,
                      }
                    : customFields[field.id].hasOwnProperty('int_value')
                    ? {
                          int_value: +customFields[field.id],
                      }
                    : customFields[field.id];
                return {
                    ...fieldValue,
                    customFieldId: field.id,
                    attribute_type: field.attribute_type,
                };
            });
            createItem({
                variables: {
                    input: {
                        name: values.name,
                        tags,
                        collectionId: collection_id,
                        customFieldsValues,
                    },
                },
            });
            error && console.error(error);
        },
    });

    const createFieldState = (field) => {
        if (field.attribute_type === TYPES.BOOLEAN) {
            setCustomFields((prevCustomFields) => ({
                ...prevCustomFields,
                [field.id]: { boolean_value: true },
            }));
        }
        if (field.attribute_type === TYPES.DATE) {
            setCustomFields((prevCustomFields) => ({
                ...prevCustomFields,
                [field.id]: { date_value: new Date() },
            }));
        }
        if (field.attribute_type === TYPES.STRING) {
            setCustomFields((prevCustomFields) => ({
                ...prevCustomFields,
                [field.id]: { string_value: '' },
            }));
        }
        if (field.attribute_type === TYPES.TEXT) {
            setCustomFields((prevCustomFields) => ({
                ...prevCustomFields,
                [field.id]: { text_value: '' },
            }));
        }
        if (field.attribute_type === TYPES.NUMBER) {
            setCustomFields((prevCustomFields) => ({
                ...prevCustomFields,
                [field.id]: { int_value: 0 },
            }));
        }
    };

    const createCustomField = (field: { id: string; attribute: string; attribute_type: TYPES }) => {
        if (field.attribute_type === TYPES.BOOLEAN) {
            return (
                <FormControlLabel
                    key={field.id}
                    className={style.formInput}
                    control={
                        <Switch
                            checked={customFields[field.id].boolean_value}
                            onChange={(_, checked) => {
                                setCustomFields((prevCustomFields) => ({
                                    ...prevCustomFields,
                                    [field.id]: { boolean_value: checked },
                                }));
                            }}
                            inputProps={{ 'aria-label': field.attribute }}
                        />
                    }
                    label={field.attribute}
                />
            );
        }
        if (field.attribute_type === TYPES.DATE) {
            return (
                <LocalizationProvider dateAdapter={AdapterDayjs} key={field.id}>
                    <DatePicker
                        className={style.formInput}
                        label={field.attribute}
                        value={customFields[field.id].date_value}
                        onChange={(newValue) => {
                            setCustomFields((prevCustomFields) => ({
                                ...prevCustomFields,
                                [field.id]: { date_value: newValue },
                            }));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            );
        }
        if (field.attribute_type === TYPES.STRING) {
            return (
                <TextField
                    className={style.formInput}
                    key={field.id}
                    variant="outlined"
                    label={field.attribute}
                    value={customFields[field.id].string_value}
                    onChange={(e) => {
                        setCustomFields((prevCustomFields) => ({
                            ...prevCustomFields,
                            [field.id]: { string_value: e.target.value },
                        }));
                    }}
                />
            );
        }
        if (field.attribute_type === TYPES.TEXT) {
            return (
                <TextField
                    className={style.formInput}
                    key={field.id}
                    variant="outlined"
                    multiline
                    maxRows={4}
                    label={field.attribute}
                    value={customFields[field.id].text_value}
                    onChange={(e) =>
                        setCustomFields((prevCustomFields) => ({
                            ...prevCustomFields,
                            [field.id]: { text_value: e.target.value },
                        }))
                    }
                />
            );
        }
        if (field.attribute_type === TYPES.NUMBER) {
            return (
                <TextField
                    className={style.formInput}
                    key={field.id}
                    type="number"
                    variant="outlined"
                    label={field.attribute}
                    value={customFields[field.id].int_value}
                    onChange={(e) =>
                        setCustomFields((prevCustomFields) => ({
                            ...prevCustomFields,
                            [field.id]: { int_value: e.target.value },
                        }))
                    }
                />
            );
        }
    };

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

    useEffect(() => {
        if (Object.keys(customFields).length !== 0) {
            setIsSet(true);
        }
    }, [customFields, fields?.getCustomFields?.length]);

    const [tagsValue, setTagsValue] = React.useState([]);

    useEffect(() => {
        !isSet && fields && fields.getCustomFields.map((field) => createFieldState(field));
    }, [fields]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className={style.item}>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <h2>create item.</h2>
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
                {loading || tagsError ? (
                    <CircularProgress disableShrink />
                ) : (
                    <Autocomplete
                        className={style.autocomplete}
                        value={tagsValue}
                        multiple
                        limitTags={2}
                        onChange={(_, newValue) => {
                            typeof newValue[newValue.length - 1] === 'string'
                                ? setTagsValue((prevValue) => [
                                      ...prevValue,
                                      { title: newValue[newValue.length - 1] },
                                  ])
                                : setTagsValue(newValue);
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={tags.getTags}
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option) => (
                            <li {...props} key={option.title}>
                                {option.title}
                            </li>
                        )}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} label="tags" />}
                    />
                )}

                {!fieldsLoading &&
                    isSet &&
                    fields.getCustomFields?.map((field) => createCustomField(field))}

                <button type="submit" className={style.createButton}>
                    create.
                </button>
            </form>
        </Box>
    );
};

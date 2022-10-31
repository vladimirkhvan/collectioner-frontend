import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '../../apollo/queries/GetCollections';
import { Card, CardContent, CardHeader, CardMedia, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import style from './CollectionsList.module.scss';
import MDEditor from '@uiw/react-md-editor';

export const CollectionsList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);

    return (
        <div className={style.collections}>
            {loading || error ? (
                <CircularProgress disableShrink />
            ) : (
                data.getCollections.map((collection) => (
                    <Link
                        to={`/collections/${collection.id}`}
                        key={collection.id}
                        className={style.wrapper}>
                        <Card className={style.card}>
                            <CardHeader
                                className={style.header}
                                title={collection.name}
                                subheader={`author: ${collection.user.name}`}
                            />
                            {collection.image ? (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={collection.image}
                                    alt={collection.name}
                                />
                            ) : null}
                            <CardContent className={style.body}>
                                <MDEditor.Markdown source={collection.description} className={style.editor}/>
                            </CardContent>
                        </Card>
                    </Link>
                ))
            )}
        </div>
    );
};

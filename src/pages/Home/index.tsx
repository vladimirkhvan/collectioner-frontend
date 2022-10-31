import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, CardMedia, CircularProgress } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';
import React from 'react';
import { GET_COLLECTIONS } from '../../apollo/queries/GetCollections';

import style from './Home.module.scss';
import { GET_TAGS } from '../../apollo/queries/GetTags';

export const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    const { loading: tagsLoading, data: tags } = useQuery(GET_TAGS);

    console.log(tags);

    return (
        <div>
            <div className={style.collections}>
                {loading || error ? (
                    <CircularProgress disableShrink />
                ) : (
                    data.getCollections
                        .map((collection) => (
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
                                        <MDEditor.Markdown
                                            source={collection.description}
                                            className={style.editor}
                                        />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                        .filter((item, index) => index < 5)
                )}
            </div>

            {!tagsLoading && tags && tags.getTags ? (
                <>
                    <h2>tags.</h2>
                    <div className={style.pills}>
                        {tags.getTags.map((tag) => (
                            <span className={style.pill} key={tag.id}>
                                {tag.title}
                            </span>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
};

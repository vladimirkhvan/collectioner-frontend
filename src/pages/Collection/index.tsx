import { useQuery } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GET_ME } from '../../apollo/queries/GetMe';
import { GET_ONE_COLLECTION } from '../../apollo/queries/GetOneCollection';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import style from './Collection.module.scss';
import { GET_ITEMS } from '../../apollo/queries/GetItems';

export const Collection: React.FC = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ONE_COLLECTION, {
        variables: {
            id,
        },
    });
    const { loading: meLoading, data: myData } = useQuery(GET_ME);
    const { loading: itemsLoading, data: items } = useQuery(GET_ITEMS, {
        variables: {
            collection_id: id
        }
    });

    console.log(items);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
    ];

    return meLoading || loading || error || !data?.getOneCollection ? (
        <CircularProgress disableShrink />
    ) : (
        <Box>
            <header>
                <div className={style.info}>
                    <h1>{data.getOneCollection.name}</h1>
                    <p>author: {data.getOneCollection.user.name}</p>
                </div>
                {data.getOneCollection.image ? (
                    <img
                        src={data.getOneCollection.image}
                        alt={data.getOneCollection.name}
                        width={350}
                    />
                ) : null}
            </header>
            <main className={style.collection}>
                <div>
                    <MDEditor.Markdown
                        source={data.getOneCollection.description}
                        className={style.editor}
                    />
                </div>

                {myData?.getMe?.id === data.getOneCollection.authorId ? (
                    <Link to="create">
                        <AddToPhotosIcon />
                    </Link>
                ) : null}
            </main>
            <div className={style.items}>
                {itemsLoading || !items || !items?.getItems ? (
                    <div>No items yet.</div>
                ) : (
                    <DataGrid
                        rows={items.getItems}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                )}
            </div>
        </Box>
    );
};

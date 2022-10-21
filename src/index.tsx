import ReactDOM from 'react-dom/client';
import './index.scss';

import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apollo_init';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>,
);

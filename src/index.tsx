import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apollo_init';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);

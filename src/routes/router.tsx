import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import Registration from '../pages/Registration';
import { Main } from '../pages/Main';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/registration',
                element: <Registration />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
]);

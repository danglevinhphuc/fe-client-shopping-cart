import React from 'react';
import NotFoundPage from './components/NotFound/NotFoundPage';
const routes = [

    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;
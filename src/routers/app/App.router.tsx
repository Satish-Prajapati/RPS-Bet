import React, { lazy, Suspense } from 'react';
import Spinner from '@components/Spinner/Spinner.component';
import { AppRoute } from '@constants/route';
import { Route, Routes } from 'react-router-dom';

// Lazy-loaded components
const HomePage = lazy(() =>
    import(/* chunkName: "home-page" */ '@pages/home/Home.page').then(
        (module) => ({
            default: module.default,
        })
    )
);

const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route element={<HomePage />} path={AppRoute.HOME} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;

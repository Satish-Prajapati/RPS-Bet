import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.component';
import AppRouter from '@routers/app/App.router';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router>
                <AppRouter />
            </Router>
        </ErrorBoundary>
    );
};

export default App;

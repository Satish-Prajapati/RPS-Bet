import React from 'react';
import BettingPositions from '@components/BettingPositions/BettingPositions.component';
import Navbar from '@components/Navbar/Navbar.component';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <BettingPositions />
        </div>
    );
};

export default HomePage;

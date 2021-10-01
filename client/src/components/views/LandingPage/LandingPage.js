import React from 'react';
import Map from './Map/Map';
import GridMenu from './GridMenu/GridMenu';

function LandingPage() {
    return (
        <div className="app"
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Map/>
            <GridMenu/>
        </div>
    );
}

export default LandingPage;

import React from 'react';
import Map from './Map/Map';
import GridMenu from './GridMenu/GridMenu';
import MapProvider from '../../../context/MapContext';

function LandingPage() {
    return (
        <MapProvider>
            <div className="app"
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Map/>
                <GridMenu/>
            </div>
        </MapProvider>
        
    );
}

export default LandingPage;

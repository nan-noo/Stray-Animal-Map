import React from 'react';
import Map from './Map/Map';

function LandingPage() {
    return (
        <div className="app"
        style={{
            
            width: '100%',
            height: '100vh',
        }}>
            <Map/>
        </div>
    );
}

export default LandingPage;

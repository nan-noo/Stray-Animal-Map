import React from 'react';

import MapProvider from '../../../context/MapContext';
import Posts from './Posts';

function CommunityPage() {
    return (
        <MapProvider>
            <div className="app"
                style={{
                    background: '#f5f5f5'
                }}
            >
                <Posts/>
            </div>
        </MapProvider>
    );
}

export default CommunityPage;

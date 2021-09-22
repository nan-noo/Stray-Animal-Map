import React from 'react'

function LandingPage(props) {
    return (
        <div className="app"
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <h2>Welcome!</h2>
        </div>
    );
}

export default LandingPage;

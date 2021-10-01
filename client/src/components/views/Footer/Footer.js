import React from 'react';
import {AiOutlineSmile} from 'react-icons/ai';

function Footer() {
    return (
        <div style={{
            height: '5rem',
            display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem',
        }}>
            <p style={{textAlign: 'center', fontSize: '1rem', color: 'grey'}}> 
                nannoo <AiOutlineSmile/>
            </p>
        </div>
    )
}

export default Footer

import React from 'react';
import {SmileOutlined} from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px',
            display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
        }}>
            <p style={{textAlign: 'center', fontSize: '1rem', color: 'grey'}}> nannoo &nbsp;
                <SmileOutlined/>
            </p>
        </div>
    )
}

export default Footer

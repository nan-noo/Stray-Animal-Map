import React from 'react';
import styled from 'styled-components';

const UploadBox = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 60%;
    margint: 3em 0;
    padding: 1em 2em;

    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

function UploadPage() {
    return (
        <div className="app">
            <UploadBox>
                hihi
            </UploadBox>
            
        </div>
    )
}

export default UploadPage

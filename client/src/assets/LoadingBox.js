import React from 'react';
import styled, {css} from 'styled-components';

const Box = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    background: rgba(1,1,1, .1);
    font-size: 1.8rem;
`;

function LoadingBox({text}) {
    return (
        <Box>{text}</Box>
    );
}

export default LoadingBox;

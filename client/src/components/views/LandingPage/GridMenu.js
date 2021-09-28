import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
    width: 45%;
    display: grid;
    background: white;

    @media only screen and (max-width: 48rem) {
        display: none;
    }
`;

function GridMenu() {
    return (
        <GridBox>
            grid items
        </GridBox>
    )
}

export default GridMenu;

import React from 'react';
import styled from 'styled-components';

import ItemBox from './ItemBox';

const GridBox = styled.div`
    width: 45%;
    height: 100%;

    background: white;

    @media only screen and (max-width: 48rem) {
        display: none;
    }
`;

const GridBar = styled.div`
    width: 100%;
    height: 4rem;
    
    display: flex;
    justify-content: end;
    align-items: center;

    padding: 0.9em 1em;

    background: white;
    box-shadow: 0 10px 10px -10px rgba(0,0,0,.05);
`;

function GridMenu() {
    return (
        <GridBox>
            <GridBar>
                found 10 results
            </GridBar>
            <ItemBox/>
        </GridBox>
    )
}

export default GridMenu;

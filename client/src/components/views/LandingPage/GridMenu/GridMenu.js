import React, {useState} from 'react';
import styled, {css} from 'styled-components';

import ItemBox from './ItemBox';

const OnOffButton = styled.button`
    position: absolute;
    top: 4rem;
    right: 45%;
    padding: .2rem .9em;

    font-size: .9rem;

    border: 1px solid rgba(0,0,0,.1);
    border-radius: 5px 0 0 5px;
    background: white;
    cursor: pointer;

    &:hover{
        background: #f5f5f5
    }
    &:active{
        background: #eeeeee;
    }
    transition: 0.125s all ease-out;

    @media only screen and (max-width: 48rem) {
        display: none;
    }

    ${props => 
        props.close &&
        css`
            right: 0%;
            transition: 0.125s all ease-out;
        `
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

const GridBox = styled.div`
    width: 45%;
    height: 100%;

    background: white;

    @media only screen and (max-width: 48rem) {
        display: none;
    }

    transition: 0.1s all ease-out;

    ${props => 
        props.close &&
        css`
            width: 0%;
            transition: 0.1s all ease-out;
            ${GridBar}{
                display: none;
            }
        `
    }
`;

function GridMenu() {
    const [close, setClose] = useState(false);

    return (
        <>
            <OnOffButton close={close} onClick={() => setClose(!close)}>
                &lt;
            </OnOffButton>
            <GridBox close={close}>
                <GridBar>
                    found 10 results
                </GridBar>
                <ItemBox/>
            </GridBox>
        </>
    )
}

export default GridMenu;

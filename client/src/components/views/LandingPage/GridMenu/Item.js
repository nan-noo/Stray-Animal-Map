import React from 'react';
import styled from 'styled-components';

const ItemBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 0.9em;
    padding: 0.5em;

    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
`;

const Image = styled.img`
    width: 20%;
    margin: 0.9em;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding: 0.9em;
`;

function Item({src, title, desc}) {
    return (
        <ItemBox>
            <Image src={src}/>
            <TextBox>
                <h2>{title}</h2>
                <p>{desc}</p>
            </TextBox>
        </ItemBox>
    )
}

export default Item;
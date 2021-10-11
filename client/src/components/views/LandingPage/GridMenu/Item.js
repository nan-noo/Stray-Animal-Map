import React from 'react';
import styled from 'styled-components';
import {FaDog} from 'react-icons/fa';

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

function Item({item}) {
    const {src, title, location, type} = item;
    const color = type === 0 ? '#ec407a' : '#42a5f5';

    return (
        <ItemBox>
            {src 
                ? <Image src={src}/>
                : <FaDog style={{width: '20%', margin: '0.9em', color}}/>
            }
            
            <TextBox>
                <h2>{title}</h2>
                <p>{location}</p>
            </TextBox>
        </ItemBox>
    )
}

export default Item;

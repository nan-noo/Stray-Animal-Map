import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PinkFoot from '../../../../assets/images/pink_foot.svg';
import BlueFoot from '../../../../assets/images/blue_foot.svg';

const ItemBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 10em;
    margin: 0.9em;
    padding: 0.5em;

    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    background: white;
    color: black;

    &:hover{
        background: #fafafa;
    }

    transition: 0.125s all ease-in;
`;

const Image = styled.img`
    width: 20%;
    height: 100%;
    margin: 0.9em;
    object-fit: contain;

    border-radius: 5px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding: 0.9em;
`;

function Item({item}) {
    const {_id, img, title, location, type, animal_type} = item;
    const src = img || (type === 'found' ? PinkFoot : BlueFoot);

    return (
        <Link to={`/community/${_id}`}>
            <ItemBox>
                <Image src={src}/>
                <TextBox>
                    <h2>{title}</h2>
                    <p>{location}</p>
                    <p>{animal_type}</p>
                </TextBox>
            </ItemBox>
        </Link>
    )
}

export default React.memo(Item);

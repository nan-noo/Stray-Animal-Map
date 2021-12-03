import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import PinkFoot from '../../../assets/images/pink_foot.svg';
import BlueFoot from '../../../assets/images/blue_foot.svg';

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    height: 20em;
    width: 15em;
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
    height: 35%;
    width: 100%;
    margin: 0.9em auto;
    border-radius: 5px;

    object-fit: fill;
`;

const TextBox = styled.div`
    width; 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;

    padding: 0.9em;
`;

const Text = styled.p`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${props => props.fontSize || '0.8rem'};
`;

function PostItem({item}) {
    const {_id, img, title, location, type, content, animal_type} = item;
    const src = img || (type === 'found' ? PinkFoot : BlueFoot);
    
    return (
        <Link to={`/community/${_id}`}>
            <ItemBox>
                <Image src={src}/>
                <TextBox>
                    <Text fontSize='1.2rem'>{title}</Text>
                    <Text>{animal_type}</Text>
                    <Text>{location}</Text>
                    <Text>{content}</Text>
                </TextBox>
            </ItemBox>
        </Link> 
    );
}

export default React.memo(PostItem);

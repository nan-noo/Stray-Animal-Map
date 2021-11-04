import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {FaDog} from 'react-icons/fa';

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

function PostItem({item}) {
    const {_id, img, title, location, type, content} = item;
    const color = type === 'find' ? '#ec407a' : '#42a5f5';
    
    return (
        <Link to={`/community/${_id}`}>
            <ItemBox>
                {img 
                    ? <Image src={img}/>
                    : <FaDog style={{height: '30%', width: '30%', margin: '0.9em auto', color}}/>
                }
                
                <TextBox>
                    <h2>{title}</h2>
                    <p>{`${location.slice(0,15)}...`}</p>
                    <p>{`${content.slice(0,15)}...`}</p>
                </TextBox>
            </ItemBox>
        </Link> 
    );
}

export default React.memo(PostItem);

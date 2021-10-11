import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {FaDog} from 'react-icons/fa';

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin: 0.9em;
    padding: 0.5em;

    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    background: white;
`;

const Image = styled.img`
    height: 30%;
    width: 100%;
    margin: 0.9em auto;
`;

const TextBox = styled.div`
    width; 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;

    padding: 0.9em;
`;

function PostBox({item}) {
    const {id, src, title, location, type} = item;
    const color = type === 0 ? '#ec407a' : '#42a5f5';
    
    return (
        <Link to={`/community/${id}`}>
            <ItemBox>
                {src 
                    ? <Image src={src}/>
                    : <FaDog style={{height: '30%', width: '30%', margin: '0.9em auto', color}}/>
                }
                
                <TextBox>
                    <h2>{title}</h2>
                    <p>{location}</p>
                    <p>desc</p>
                </TextBox>
            </ItemBox>
        </Link> 
    )
}

export default PostBox
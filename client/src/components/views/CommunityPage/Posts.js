import React from 'react';
import styled from 'styled-components';

import { useMapState } from '../../../context/MapContext';
import PostItem from './PostItem';

const PostsBox = styled.div`
    display: flex;

    height: 100%;
    margin: 3em 0;

`;

function Posts() {
    const {items} = useMapState();

    return (
        <PostsBox>
            {items.map(item => (
                <PostItem key={item.id} item={item}/>
            ))}
        </PostsBox>
    )
}

export default Posts

import React from 'react';
import styled from 'styled-components';

import { useMapState } from '../../../context/MapContext';
import PostBox from './PostBox';

const PostsBox = styled.div`
    width: 50%;
    height: 100%;
    margin: 3em 0;

    overflow-y: scroll;
`;

function Posts() {
    const {items} = useMapState();

    return (
        <PostsBox>
            {items.map(item => (
                <PostBox key={item.id} item={item}/>
            ))}
        </PostsBox>
    )
}

export default Posts

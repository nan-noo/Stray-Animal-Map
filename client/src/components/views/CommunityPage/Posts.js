import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from '../../../axios';

import PostItem from './PostItem';
import { POST_SERVER } from '../../Config';
import { useMapState } from '../../../context/MapContext';

const PostsBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;

    margin: 3em 0;

    @media only screen and (max-width: 48rem) {
        display: flex;
        flex-direction: column;
    }
`;

function Posts() {
    const {posts} = useMapState();

    return (
        <PostsBox>
            {posts.map((post, index) => (
                <PostItem key={index} item={post}/>
            ))}
        </PostsBox>
    )
}

export default Posts

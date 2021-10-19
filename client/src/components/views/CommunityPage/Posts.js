import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from '../../../axios';

import { useMapState } from '../../../context/MapContext';
import PostItem from './PostItem';
import { POST_SERVER } from '../../Config';

const PostsBox = styled.div`
    display: flex;

    height: 100%;
    margin: 3em 0;

`;

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${POST_SERVER}/getPosts`)
            .then(response => {
                response.data.success ? setPosts(response.data.posts) : alert('Faile to get posts');
            });
    }, []);

    return (
        <PostsBox>
            {posts.map((post, index) => (
                <PostItem key={index} item={post}/>
            ))}
        </PostsBox>
    )
}

export default Posts

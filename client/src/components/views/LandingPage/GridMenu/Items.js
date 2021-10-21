import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from '../../../../axios';

import { POST_SERVER } from '../../../Config';
import Item from './Item';

const Container = styled.div`
    height: calc(100% - 4rem);
    overflow-y: auto;

    background: #fafafa;
`;

function Items({checked1, checked2}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${POST_SERVER}/getPosts`)
            .then(response => {
                response.data.success ? setPosts(response.data.posts) : alert('Faile to get posts');
            });
    }, []);

    return (
        <Container>
            {checked1 && posts.map((post, index) => (
                post.type === 'find'
                && <Item key={index} item={post}/>
            ))}
            {checked2 && posts.map((post, index) => (
                post.type === 'lost'
                && <Item key={index} item={post}/>
            ))}
        </Container>
    )
}

export default Items

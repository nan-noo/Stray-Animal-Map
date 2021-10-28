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
            {posts.map((post, index) => {
                if(checked1 && post.type === 'find') return <Item key={index} item={post}/>;
                if(checked2 && post.type === 'lost') return <Item key={index} item={post}/>;
            })}
        </Container>
    )
}

export default Items

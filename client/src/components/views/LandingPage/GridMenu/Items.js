import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from '../../../../axios';

import { POST_SERVER } from '../../../Config';
import { useMapState } from '../../../../context/MapContext';
import Item from './Item';

const Container = styled.div`
    height: calc(100% - 4rem);
    overflow-y: scroll;

    background: #fafafa;
`;

function Items() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${POST_SERVER}/getPosts`)
            .then(response => {
                response.data.success ? setPosts(response.data.posts) : alert('Faile to get posts');
            });
    }, []);
    const {items, } = useMapState();

    return (
        <Container>
            {posts.map((post, index) => (
                <Item key={index} item={post}/>
            ))}
        </Container>
    )
}

export default Items

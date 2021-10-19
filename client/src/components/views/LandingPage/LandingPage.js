import React, {useState, useEffect} from 'react';
import axios from '../../../axios';
import { POST_SERVER } from '../../Config';

import Map from './Map/Map';
import GridMenu from './GridMenu/GridMenu';

function LandingPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${POST_SERVER}/getPosts`)
            .then(response => {
                response.data.success ? setPosts(response.data.posts) : alert('Faile to get posts');
            });
    }, []);

    return (
        <div className="app"
        style={{
            height: '100vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Map posts={posts}/>
            <GridMenu posts={posts}/>
        </div>

    );
}

export default LandingPage;

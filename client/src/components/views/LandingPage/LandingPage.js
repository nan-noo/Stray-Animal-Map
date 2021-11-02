import React, {useState, useEffect} from 'react';
import axios from '../../../axios';
import { POST_SERVER } from '../../Config';

import Map from './Map/Map';
import GridMenu from './GridMenu/GridMenu';

function LandingPage() {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [mapBounds, setMapBounds] = useState(null);
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
            <Map posts={posts} checked1={checked1} checked2={checked2} setChecked1={setChecked1} setChecked2={setChecked2}
                setMapBounds={setMapBounds}
            />
            <GridMenu posts={posts} checked1={checked1} checked2={checked2} mapBounds={mapBounds}/>
        </div>

    );
}

export default LandingPage;

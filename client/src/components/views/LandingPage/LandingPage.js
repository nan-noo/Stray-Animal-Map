import React, {useState, useEffect} from 'react';
import axios from '../../../axios';
import { POST_SERVER } from '../../Config';

import Map from './Map/Map';
import GridMenu from './GridMenu/GridMenu';
import { useMapDispatch } from '../../../context/MapContext';

function LandingPage() {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [selected, setSelected] = useState('전체');
    const dispatch = useMapDispatch();

    useEffect(() => {
        axios.get(`${POST_SERVER}/posts`)
            .then(response => {
                response.data.success ? dispatch({type: 'UPDATE_POSTS', posts: response.data.posts}) : alert('Faile to get posts');
            });
    }, [dispatch]);

    return (
        <div className="app"
        style={{
            height: '100vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Map checked1={checked1} checked2={checked2} setChecked1={setChecked1} setChecked2={setChecked2} selected={selected}/>
            <GridMenu checked1={checked1} checked2={checked2} selected={selected} setSelected={setSelected}/>
        </div>

    );
}

export default LandingPage;

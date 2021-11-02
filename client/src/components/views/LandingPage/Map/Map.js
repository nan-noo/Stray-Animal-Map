import React, {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { 
    GoogleMap, InfoWindow, Marker, StandaloneSearchBox,
    useJsApiLoader 
} from '@react-google-maps/api';
import styled from 'styled-components';
import {IoSearchOutline} from 'react-icons/io5';

import mapStyle from './style/mapStyle';
import libraries from './libraries/libraries';
import CheckBox from '../../../assets/CheckBox';
import {GOOGLE_API_KEY} from '../../../../secret';
import { useMapState, useMapDispatch } from '../../../../context/MapContext';
import findIcon from '../../../assets/images/findIcon.svg';
import lostIcon from '../../../assets/images/lostIcon.svg';

const SearchBar = styled.div`
    position: absolute;
    width: 100%;
    height: 4rem;
    
    display: flex;
    justify-content: start;
    align-items: center;
    background: white;
    z-index: 3;

    box-shadow: 0 15px 10px -15px rgba(0,0,0,.2);
`;

const SearchBox = styled.input`
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,.2);

    padding: 0.8em;
    font-size: 0.8rem;

    min-width: 30%;
`;

const containerStyle = {
    height: '100vh',
    flexGrow: 1,
};

function Map({posts, checked1, checked2, setChecked1, setChecked2, setMapBounds}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: libraries
    });
    const [googleMap, setGoogleMap] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const [address, setAddress] = useState('');
    const dispatch = useMapDispatch();
    const {center} = useMapState();

    const onGoogleMapLoad = map => { setGoogleMap(map); setMapBounds(map.getBounds()); };
    const onSearchBoxLoad = ref => { setSearchBox(ref); };
    const onPlacesChanged = () => {
        setAddress(searchBox.getPlaces()[0].formatted_address);
        const inputPlace = searchBox.getPlaces()[0].geometry.location;
        dispatch({type: 'UPDATE_CENTER', lat: inputPlace.lat(), lng: inputPlace.lng()})
    };

    return isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    options={{
                        styles: mapStyle
                    }}
                    onLoad={onGoogleMapLoad}
                    onBoundsChanged={() => {setMapBounds(googleMap.getBounds());}}
                >
                    {/* Search Bar */}
                    <StandaloneSearchBox
                        onLoad={onSearchBoxLoad}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <SearchBar>
                            <IoSearchOutline style={{margin: '0.9em', color: 'gray'}}/>
                            <SearchBox
                                type="text"
                                placeholder="Search Location"
                            />
                            <div style={{display: 'flex', marginLeft: 'auto', marginRight: '1em'}}>
                                <CheckBox text="found" checked={checked1} color='#ec407a' onChange={e => setChecked1(e.target.checked)}/>
                                <CheckBox text="lost" checked={checked2} color='#42a5f5' onChange={e => setChecked2(e.target.checked)}/>
                            </div>
                        </SearchBar>
                    </StandaloneSearchBox>

                    {/* info items */}
                    {address && 
                        <InfoWindow
                            position={center}
                        >   
                            <Link to={{
                                pathname: '/upload',
                                state: {address}
                            }} style={{color: '#ec407a', fontSize: '.9rem', fontWeight: 'bold'}}>
                                여기에 추가하기
                            </Link>
                        </InfoWindow>
                    }
                    {posts.map((post, index) => {
                        if(checked1 && post.type === 'find') {
                            return <Marker 
                                key={index}
                                icon={{ url: findIcon }}
                                position={post.latLng}
                            />;
                        }
                        else if(checked2 && post.type === 'lost') {
                            return <Marker 
                                key={index}
                                icon={{ url: lostIcon }}
                                position={post.latLng}
                            />;
                        }         
                    })}
                </GoogleMap>
    ) : <p>Loading...</p>
}

export default Map;

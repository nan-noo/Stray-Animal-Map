import React, {useState, useEffect} from 'react';
import axios from '../../../../axios';
import { GoogleMap, LoadScript, InfoWindow, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import styled from 'styled-components';
import {IoSearchOutline} from 'react-icons/io5';
//import Geocode from "react-geocode";

import { POST_SERVER } from '../../../Config';

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

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey(GOOGLE_API_KEY);

// // Get latitude & longitude from address.
// Geocode.fromAddress("Eiffel Tower").then(
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log(lat, lng);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );

function Map() {
    const [posts, setPosts] = useState([]);
    const [searchBox, setSearchBox] = useState(null);
    const dispatch = useMapDispatch();
    const {center, items} = useMapState();

    const [place, setPlace] = useState(null);
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);

    useEffect(() => {
        axios.get(`${POST_SERVER}/getPosts`)
            .then(response => {
                response.data.success ? setPosts(response.data.posts) : alert('Faile to get posts');
            });
    }, []);


    const onInfoWindowLoad = infoWindow => { console.log('infoWindow: ', infoWindow); };
    const onSearchBoxLoad = ref => { setSearchBox(ref); };
    const onPlacesChanged = () => {
        const inputPlace = searchBox.getPlaces()[0].geometry.location;
        
        setPlace(inputPlace);
        dispatch({type: 'UPDATE_CENTER', lat: inputPlace.lat(), lng: inputPlace.lng()})
    };

    return (
        <>
            <LoadScript
                googleMapsApiKey={GOOGLE_API_KEY}
                libraries={libraries}
            >   
                {/* Map */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    options={{
                        styles: mapStyle
                    }}
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
                    <InfoWindow
                        onLoad={onInfoWindowLoad}
                        position={center}
                    >
                        <div style={{background: 'white'}}>
                            {place &&
                                <>
                                    <p>{place.lat()}</p> 
                                    <p>{place.lng()}</p>
                                </>
                            }
                        </div>
                    </InfoWindow> 
                    {checked1 && posts.map((item, index) => (
                        item.type === 'find'
                        && <Marker 
                                key={index}
                                icon={{ url: findIcon }}
                                position={item.latLng}
                            />
                    ))}
                    {checked2 && posts.map((item, index) => (
                        item.type === 'lost'
                        && <Marker 
                                key={index}
                                icon={{ url: lostIcon }}
                                position={item.latLng}
                            />
                    ))}
                </GoogleMap>
            </LoadScript>
        </>   
    );
}

export default Map;

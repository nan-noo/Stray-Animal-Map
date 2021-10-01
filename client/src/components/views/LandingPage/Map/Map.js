import React, {useState} from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import styled from 'styled-components';
import {IoSearchOutline} from 'react-icons/io5';

import mapStyle from './style/mapStyle';
import libraries from './libraries/libraries';
import CheckBox from '../../../assets/CheckBox';
import {GOOGLE_API_KEY} from '../../../../secret';

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

const center = { // 서울
    lat: 37.336,
    lng: 126.584
};

/* <div style={{
                   

                   width: '100%',
                   height: '1rem',
                   textAlign: 'center'
               }}>
                   {place?.geometry &&
                       <>
                           <p>{place.geometry.location.lat()}</p> 
                           <p>{place.geometry.location.lng()}</p>
                       </>
                   }
           </div> */

function Map() {
    const [searchBox, setSearchBox] = useState(null);
    const [place, setPlace] = useState({});
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const onLoad = infoWindow => {
        //console.log('infoWindow: ', infoWindow)
    }

    const onLoad2 = ref => {
        setSearchBox(ref);
    }

    const onPlacesChanged = () => {
        console.log(searchBox.getPlaces()[0]);
        setPlace(searchBox.getPlaces()[0]);
    }

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
                    zoom={10}
                    options={{
                        styles: mapStyle
                    }}
                >
                    {/* Search Bar */}
                    <StandaloneSearchBox
                        onLoad={onLoad2}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <SearchBar>
                            <IoSearchOutline style={{margin: '0.9em', color: 'gray'}}/>
                            <SearchBox
                                type="text"
                                placeholder="Search Location"
                            />
                            <div style={{display: 'flex', marginLeft: 'auto', marginRight: '1em'}}>
                                <CheckBox checked={checked1} color='#ec407a' onChange={e => setChecked1(e.target.checked)}/>
                                <CheckBox checked={checked2} color='#42a5f5' onChange={e => setChecked2(e.target.checked)}/>
                            </div>
                        </SearchBar>
                    </StandaloneSearchBox>
                    <InfoWindow
                        onLoad={onLoad}
                        position={center}
                    >
                        <div style={{background: 'white'}}>
                            <h1>InfoWindow</h1>
                        </div>
                    </InfoWindow> 
                    <Marker
                        icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                        position={center}
                    />
                </GoogleMap>
            </LoadScript>
        </>   
    )
}

export default Map;

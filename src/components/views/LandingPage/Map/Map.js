import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { 
    GoogleMap, InfoWindow, Marker, StandaloneSearchBox,
    useJsApiLoader 
} from '@react-google-maps/api';
import Geocode from "react-geocode";
import styled from 'styled-components';
import {IoSearchOutline} from 'react-icons/io5';

import mapStyle from './style/mapStyle';
import libraries from './libraries/libraries';
import CheckBox from '../../../../assets/CheckBox';
import {GOOGLE_API_KEY} from '../../../../config/config';
import { useMapState, useMapDispatch } from '../../../../context/MapContext';
import LoadingBox from '../../../../assets/LoadingBox';

import foundDog from '../../../../assets/images/markers/found_dog.svg';
import foundCat from '../../../../assets/images/markers/found_cat.svg';
import foundHam from '../../../../assets/images/markers/found_hamster.svg';
import foundEtc from '../../../../assets/images/markers/found_foot.svg';
import lostDog from '../../../../assets/images/markers/lost_dog.svg';
import lostCat from '../../../../assets/images/markers/lost_cat.svg';
import lostHam from '../../../../assets/images/markers/lost_hamster.svg';
import lostEtc from '../../../../assets/images/markers/lost_foot.svg';

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

async function getGeocode(lat, lng){
    Geocode.setApiKey(GOOGLE_API_KEY);
    Geocode.setLanguage("ko");
    Geocode.setRegion("kr");
    Geocode.setLocationType("ROOFTOP"); // most accurate result
    try{
        const response = await Geocode.fromLatLng(String(lat), String(lng));
        return response.results[0].formatted_address;
    }
    catch{
        console.error('Failed to get geocode from latLng');
    }
}

function Map({checked1, checked2, setChecked1, setChecked2, selected}) {
    const history = useHistory();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: libraries
    });
    const [googleMap, setGoogleMap] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const [address, setAddress] = useState('');
    const [infoLocation, setInfoLocation] = useState({})
    const dispatch = useMapDispatch();
    const {center, posts} = useMapState();

    const onGoogleMapLoad = map => { 
        setGoogleMap(map); 
        dispatch({type: 'UPDATE_BOUNDS', bounds: map.getBounds()});
    };
    const onSearchBoxLoad = ref => { setSearchBox(ref); };
    const onPlacesChanged = () => {
        const inputPlace = searchBox.getPlaces()[0].geometry.location;
        dispatch({type: 'UPDATE_CENTER', lat: inputPlace.lat(), lng: inputPlace.lng()})
    };
    const onGoogleMapClick = async e => {
        const location = await getGeocode(e.latLng.lat(), e.latLng.lng());
        setInfoLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
        setAddress(location);
    };

    const importSvg = (type, animalType) => {
        if(type === 'found') {
            switch(animalType){
                case '강아지':
                    return foundDog;
                case '고양이':
                    return foundCat;
                case '햄스터':
                    return foundHam;
                default:
                    return foundEtc;
            }
        }
        else {
            switch(animalType){
                case '강아지':
                    return lostDog;
                case '고양이':
                    return lostCat;
                case '햄스터':
                    return lostHam;
                default:
                    return lostEtc;
            }
        }
    };

    const onMarkerClick = (id) => history.push(`/community/${id}`);

    return isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={{
                        styles: mapStyle,
                        disableDefaultUI: true,
                    }}
                    onLoad={onGoogleMapLoad}
                    onBoundsChanged={() => {dispatch({type: 'UPDATE_BOUNDS', bounds: googleMap.getBounds()});}}
                    onClick={onGoogleMapClick}
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
                            position={infoLocation}
                            onCloseClick={() => setAddress('')}
                        >   
                            <Link to={{
                                pathname: '/upload',
                                state: {address}
                            }} style={{color: '#ec407a', fontSize: '.9rem', fontWeight: 'bold'}}>
                                여기에 추가하기
                            </Link>
                        </InfoWindow>
                    }
                    {/* Markers */}
                    {posts.map((post, index) => {
                        if(selected === '전체'){
                            if(checked1 && post.type === 'found') {
                                return <Marker 
                                    key={index}
                                    icon={{url: importSvg(post.type, post.animal_type)}}
                                    position={post.latLng}
                                    onClick={() => onMarkerClick(post._id)}
                                />;
                            }
                            else if(checked2 && post.type === 'lost') {
                                return <Marker 
                                    key={index}
                                    icon={{url: importSvg(post.type, post.animal_type)}}
                                    position={post.latLng}
                                    onClick={() => onMarkerClick(post._id)}
                                />;
                            }
                        }
                        else {
                            if(checked1 && post.type === 'found' && selected === post.animal_type) {
                                return <Marker 
                                    key={index}
                                    icon={{url: importSvg(post.type, post.animal_type)}}
                                    position={post.latLng}
                                    onClick={() => onMarkerClick(post._id)}
                                />;
                            }
                            else if(checked2 && post.type === 'lost' && selected === post.animal_type) {
                                return <Marker 
                                    key={index}
                                    icon={{url: importSvg(post.type, post.animal_type)}}
                                    position={post.latLng}
                                    onClick={() => onMarkerClick(post._id)}
                                />;
                            }
                        }
                        return <></>;
                    })}
                </GoogleMap>
    ) : <LoadingBox text="Loading..."/>;
}

export default Map;

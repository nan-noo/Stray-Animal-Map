import React, {useState} from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import styled from 'styled-components';

import mapStyle from './style/mapStyle';
import libraries from './libraries/libraries';

const SearchBar = styled.div`
    position: absolute;
    width: 100%;
    height: 4rem;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    z-index: 5;

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
    width: '100%',
    height: '500px',
    flexGrow: 1
  };
  
const center = { // 서울
    lat: 37.336,
    lng: 126.584
};

{/* <div style={{
                   

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
           </div> */}

function Map() {
    const [searchBox, setSearchBox] = useState(null);
    const [place, setPlace] = useState({});

    const onLoad = infoWindow => {
        //console.log('infoWindow: ', infoWindow)
    }

    const onLoad2 = ref => {
        //console.log(ref);
        setSearchBox(ref);
    }

    const onPlacesChanged = () => {
        console.log(searchBox.getPlaces()[0]);
        setPlace(searchBox.getPlaces()[0]);
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyAEnuJzpvY1QP4JG1sMUb_qvsVqm7TjcJQ"
                libraries={libraries}
            >   
                {/* Search Bar */}
                
                
                {/* Map */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={{
                        styles: mapStyle
                    }}
                >
                    <StandaloneSearchBox
                        onLoad={onLoad2}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <SearchBar>
                            <SearchBox
                                type="text"
                                placeholder="Customized your placeholder"
                            />
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

             {/* Right Menu */}
        </>   
    )
}

export default Map;

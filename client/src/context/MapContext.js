import React, {createContext, useContext, useReducer} from 'react';

const initialCenter = {
    center: {
        lat: 37.5866076,
        lng: 126.974811
    }
};

function mapReducer(state, action){
    switch(action.type){
        case 'CHANGE_CENTER':
            return {
                center: {
                    lat: action.lat, lng: action.lng
                }
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const MapStateContext = createContext();
export function useMapState(){
    const state = useContext(MapStateContext);
    if(!state) throw new Error('Cannot find TodoProvider');
    return state;
}

const MapDispatchContext = createContext();
export function useMapDispatch(){
    const state = useContext(MapDispatchContext);
    if(!state) throw new Error('Cannot find TodoProvider');
    return state;
}

export default function MapProvider({children}) {
    const [state, dispatch] = useReducer(mapReducer, initialCenter);

    return (
        <MapStateContext.Provider value={state}>
            <MapDispatchContext.Provider value={dispatch}>
                {children}
            </MapDispatchContext.Provider>
        </MapStateContext.Provider>
    )
}

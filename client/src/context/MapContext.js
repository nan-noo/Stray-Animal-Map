import React, {createContext, useContext, useReducer, useRef} from 'react';

const initialMap = {
    center: {
        lat: 37.5866076,
        lng: 126.974811
    },
    posts: [],
    bounds: null,
};

function mapReducer(state, action){
    switch(action.type){
        case 'UPDATE_CENTER':
            return {
                ...state,
                center: {
                    lat: action.lat, lng: action.lng
                },
            };
        case 'UPDATE_POSTS':
            return {
                ...state,
                posts: [
                    ...action.posts
                ],
            };
        case 'UPDATE_BOUNDS':
            return {
                ...state,
                bounds: action.bounds,
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

const MapNextIdContext = createContext();
export function useMapNextId(){
    const nextId = useContext(MapNextIdContext);
    if(!nextId) throw new Error('Cannot find TodoProvider');
    return nextId;
}

export default function MapProvider({children}) {
    const [state, dispatch] = useReducer(mapReducer, initialMap);
    const nextId = useRef(3);

    return (
        <MapStateContext.Provider value={state}>
            <MapDispatchContext.Provider value={dispatch}>
                <MapNextIdContext.Provider value={nextId}>
                    {children}
                </MapNextIdContext.Provider>
            </MapDispatchContext.Provider>
        </MapStateContext.Provider>
    );
}

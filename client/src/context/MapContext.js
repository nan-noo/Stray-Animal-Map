import React, {createContext, useContext, useReducer, useRef} from 'react';

const initialMap = {
    center: {
        lat: 37.5866076,
        lng: 126.974811
    },
    items: [
        {
            id: 1,
            img: null,
            title: '1',
            desc: '1-1'
        },
        {
            id: 2,
            img: null,
            title: '2',
            desc: '2-1'
        },
    ]
};

function mapReducer(state, action){
    switch(action.type){
        case 'UPDATE_CENTER':
            return {
                ...state,
                center: {
                    lat: action.lat, lng: action.lng
                }
            };
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.item]
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
    )
}

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
            title: '강아지 발견했어요',
            type: 'find',
            location: '서울특별시 망원1동 한강공원입구',
            content: 'fkfkfk',
            latLng: {lat: 37.5560625, lng: 126.8989498}
        },
        {
            id: 2,
            img: null,
            title: '강아지 잃어버렸어요',
            type: 'lost',
            location: '대한민국 서울특별시 강남',
            content: 'asfdas',
            latLng: {lat: 37.5172363, lng: 127.0473248}
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

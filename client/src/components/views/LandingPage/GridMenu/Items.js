import React from 'react';
import styled from 'styled-components';

import { useMapState } from '../../../../context/MapContext';
import Item from './Item';

const Container = styled.div`
    height: calc(100% - 4rem);
    overflow-y: scroll;
`;

function Items() {
    const {items, } = useMapState();

    return (
        <Container>
            {items.map(item => (
                <Item key={item.id} item={item}/>
            ))}
        </Container>
    )
}

export default Items

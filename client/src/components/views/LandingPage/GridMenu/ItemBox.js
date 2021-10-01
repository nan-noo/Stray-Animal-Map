import React from 'react';
import styled from 'styled-components';

import Item from './Item';

const Container = styled.div`
    height: calc(100% - 4rem);
    overflow-y: scroll;
`;

function ItemBox() {
    return (
        <Container>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
            <Item title="1" desc="1-1"/>
        </Container>
    )
}

export default ItemBox

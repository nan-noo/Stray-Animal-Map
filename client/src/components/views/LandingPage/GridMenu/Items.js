import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    height: calc(100% - 4rem);
    overflow-y: auto;

    background: #fafafa;
`;

function Items({checked1, checked2, posts, mapBounds, selected}) {
    
    return (
        <Container>
            {posts
                .filter(post => mapBounds.contains(post.latLng))
                .map((post, index) => {
                    if(selected === '전체'){
                        if(checked1 && post.type === 'found') return <Item key={index} item={post}/>;
                        else if(checked2 && post.type === 'lost') return <Item key={index} item={post}/>;
                        else return <></>;
                    }
                    else{
                        if(checked1 && post.type === 'found' && post.animal_type === selected) return <Item key={index} item={post}/>;
                        else if(checked2 && post.type === 'lost' && post.animal_type === selected) return <Item key={index} item={post}/>;
                        else return <></>;
                    }
            })}
        </Container>
    )
}

export default Items

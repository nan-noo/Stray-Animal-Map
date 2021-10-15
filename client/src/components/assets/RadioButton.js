import React from 'react';
import styled from 'styled-components';

const RadioBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5em;
`;

const CheckLabel = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;

    padding: 0.5em;
`;

const CheckMark = styled.div`
    height: 1.5em;
    width: 1.5em;
    background: ${props => props.checked ? props.color: '#eeeeee'};
    border-radius: 50%;

    &:hover{
        opacity: 0.8;
    }
`;

const CheckInput = styled.input`
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

function RadioButton({checked, setChecked}) {
    return (
        <RadioBox>
            <CheckLabel>
                find &nbsp;
                <CheckInput type="radio" name="animal" value="find" 
                    checked={checked === 'find'} onChange={setChecked}/>
                <CheckMark checked={checked === 'find'} color="#ec407a"/>
            </CheckLabel>
            <CheckLabel>
                lost &nbsp;
                <CheckInput type="radio" name="animal" value="lost" 
                    checked={checked === 'lost'} onChange={setChecked}/>
                <CheckMark checked={checked === 'lost'} color="#42a5f5"/>
            </CheckLabel>
        </RadioBox>
    )
}

export default React.memo(RadioButton);

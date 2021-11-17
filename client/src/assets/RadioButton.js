import React from 'react';
import styled from 'styled-components';
import {AiOutlineCheck} from 'react-icons/ai';

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
    display: flex;
    justify-content: center;
    align-items: center;

    height: 1.5em;
    width: 1.5em;
    background: ${props => props.checked ? props.color: '#eeeeee'};
    border-radius: 50%;
    color: white;

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
                found &nbsp;
                <CheckInput type="radio" name="type" value="found" 
                    checked={checked === 'found'} onChange={setChecked}/>
                <CheckMark checked={checked === 'found'} color="#ec407a"><AiOutlineCheck/></CheckMark>
            </CheckLabel>
            <CheckLabel>
                lost &nbsp;
                <CheckInput type="radio" name="type" value="lost" 
                    checked={checked === 'lost'} onChange={setChecked}/>
                <CheckMark checked={checked === 'lost'} color="#42a5f5"><AiOutlineCheck/></CheckMark>
            </CheckLabel>
        </RadioBox>
    )
}

export default React.memo(RadioButton);

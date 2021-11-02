import React from 'react';
import styled from 'styled-components';
import {AiOutlineCheck} from 'react-icons/ai';

const CheckBoxBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5em;
`;

const CheckLabel = styled.label`
    cursor: pointer;
    display: flex;
`;

const CheckInput = styled.input`
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
    cursor: pointer;
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

function CheckBox({checked, color, text, ...rest}) {
    return (
        <CheckBoxBox>
            <CheckLabel>
                {text} &nbsp;
                <CheckInput type="checkbox" checked={checked} {...rest}/>
                <CheckMark checked={checked} color={color}><AiOutlineCheck/></CheckMark>
            </CheckLabel>
        </CheckBoxBox>
    )
}

export default React.memo(CheckBox);

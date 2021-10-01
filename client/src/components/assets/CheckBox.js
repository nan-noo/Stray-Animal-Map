import React from 'react';
import styled from 'styled-components';
import {RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine} from 'react-icons/ri';

const CheckBoxBox = styled.div`
    display: flex;
    align-items: center;

    margin: 0.9em;
`;

const CheckLabel = styled.label`
    cursor: pointer;
`;

const CheckInput = styled.input`
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
`;

function CheckBox({checked, color, ...rest}) {
    return (
        <CheckBoxBox>
            <CheckLabel>
                <CheckInput type="checkbox" checked={checked} {...rest}/>
                <div>
                    {checked 
                        ? <RiCheckboxBlankCircleFill style={{color, fontSize: '1.1rem'}}/>
                        : <RiCheckboxBlankCircleLine style={{color, fontSize: '1.1rem'}}/>
                    }
                </div>
            </CheckLabel>
        </CheckBoxBox>
    )
}

export default React.memo(CheckBox);

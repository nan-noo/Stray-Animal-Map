import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    padding: .9em;
    border: 1px solid #eaeaea;

    &:hover{
        background: #fafafafa;
    }
    &:focus{
        border: 1px solid #ec407a;
        outline: none;
    }
`;

const Option = styled.option`
    text-align: center;
`;

function DropList({selected, onChange, isAll}) {
    return (
        <Select name="animal_type" value={selected} onChange={onChange}>
            {isAll && <Option value="전체">전체</Option>}
            <Option value="강아지">강아지</Option>
            <Option value="고양이">고양이</Option>
            <Option value="햄스터">햄스터</Option>
            <Option value="기타">기타</Option>
        </Select>
    );
}

export default DropList;

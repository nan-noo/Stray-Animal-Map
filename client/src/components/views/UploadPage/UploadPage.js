import React, {useState} from 'react';
import styled from 'styled-components';
import axios from '../../../axios';

import { PrimaryButton } from '../../assets/Buttons';
import RadioButton from '../../assets/RadioButton';

const UploadBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;
    height: 60%;
    margint: 3em 0;
    padding: 1em 2em;

    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

const FormBox = styled.form`
    width: 100%;
`;

const InputBox = styled.input`
    width: 100%;
    margin: 0.5em 0;
    padding: 0.2em 0.5em;
    font-size: 0.9rem;

    border-radius: 5px;
    border: 1px solid #eeeeee;
    background: #fafafa;
`;

function UploadPage() {
    const [inputs, setInputs] = useState({
        title: '', img: '', content: '', location: '', type: 0,
    });
    const {title, img, content, location, type} = inputs;

    const [checked, setChecked] = useState('');

    // postId, latLng, writer도 같이 업로드
    const onSubmit = e => {
        e.preventDefault();
        console.log(inputs);
    };

    const onInputChange = e => {
        const {name, value} = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    };

    const onCheckedHandler = e => {
        setChecked(e.target.value);
    }

    return (
        <div className="app">
            <UploadBox>
                <h2>Upload Post</h2>
                {/* input: title, img, content, location, type */}
                <FormBox onSubmit={onSubmit}>
                    <InputBox type="text" placeholder="제목을 작성해주세요: 글자수제한(50)" 
                        name="title" value={title} onChange={onInputChange}
                    />
                    <InputBox type="text" placeholder="위치를 작성해주세요" 
                        name="location" value={location} onChange={onInputChange}
                    />
                    <RadioButton checked={checked} setChecked={onCheckedHandler}/>
                    <PrimaryButton>upload</PrimaryButton>
                </FormBox>

            </UploadBox>
            
        </div>
    )
}

export default UploadPage

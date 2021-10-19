import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../axios';

import {POST_SERVER} from '../../Config';
import { useMapNextId } from '../../../context/MapContext';

import { PrimaryButton } from '../../assets/Buttons';
import RadioButton from '../../assets/RadioButton';

const UploadBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;
    height: 70%;
    margint: 3em 0;
    padding: 1em 2em 2em;

    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

const FormBox = styled.form`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
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

const ContentArea = styled.textarea`
    width: 100%;
    flex-grow: 1;
    margin: 0.5em 0 1em;
    padding: 0.9em;
    font-size: 0.9rem;

    border-radius: 5px;
    border: 1px solid #eeeeee;
    background: #fafafa;
`;

function UploadPage() {
    const history = useHistory();
    const user = useSelector(state => state.user);
    const nextId = useMapNextId();
    const [inputs, setInputs] = useState({
        title: '', img: '', content: '', location: '',
    });
    const {title, img, content, location} = inputs;

    const [type, setType] = useState(''); // 'find' or 'lost'

    const onSubmit = async e => {
        e.preventDefault();

        const data = { ...inputs, type, writer: user.userData._id, postId: nextId.current, latLng: {lat: 37.5172363, lng: 127.0473248}}
        nextId.current++;
        const response = await axios.post(`${POST_SERVER}/uploadPost`, data);

        response.data.success && history.push('/');
    };

    const onInputChange = e => {
        const {name, value} = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    };

    const onCheckedHandler = e => {
        setType(e.target.value);
    }

    return (
        <div className="app">
            <UploadBox>
                <h2>Upload Post</h2>
                {/* title, img, content, location, type */}
                <FormBox onSubmit={onSubmit}>
                    <InputBox type="text" placeholder="제목을 작성해주세요: 글자수제한(50)"
                        name="title" value={title} onChange={onInputChange}
                    />
                    <InputBox type="text" placeholder="위치를 작성해주세요" 
                        name="location" value={location} onChange={onInputChange}
                    />
                    <RadioButton checked={type} setChecked={onCheckedHandler}/>
                    <ContentArea name="content" value={content} onChange={onInputChange} placeholder="내용을 작성해주세요"/>
                    <PrimaryButton>upload</PrimaryButton>
                </FormBox>
            </UploadBox>  
        </div>
    )
}

export default UploadPage

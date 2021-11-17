import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import Geocode from "react-geocode";
import styled from 'styled-components';
import axios from '../../../axios';

import {POST_SERVER, BASE_SERVER} from '../../Config';
import {GOOGLE_API_KEY} from '../../../secret';

import { PrimaryButton } from '../../../assets/Buttons';
import RadioButton from '../../../assets/RadioButton';
import DropZone from './DropZone';

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

async function getGeocode(location){
    Geocode.setApiKey(GOOGLE_API_KEY);
    Geocode.setLanguage("ko");
    Geocode.setRegion("kr");
    Geocode.setLocationType("ROOFTOP"); // most accurate result
    try{
        const response = await Geocode.fromAddress(location);
        return response.results[0].geometry.location;
    }
    catch{
        alert('주소를 다시 입력해주세요');
    }
}

function UploadPage() {
    const history = useHistory();
    const _location = useLocation();
    const user = useSelector(state => state.user);
    const [inputs, setInputs] = useState({
        title: '', content: '', location: _location.state?.address || '',
    });
    const {title, content, location} = inputs;
    const [file, setFile] = useState('');
    const [type, setType] = useState('find');

    const uploadImage = async file => {
        const formData = new FormData();
        const config = { header: { "content-type": "multipart/form-data"} };
        formData.append("file", file);
        
        const response = await axios.post(`${POST_SERVER}/image`, formData, config)
        if(response.data.success){
            return `${BASE_SERVER}/${response.data.filePath}`;
        }
        else return '';
    };

    const onSubmit = async e => {
        e.preventDefault();

        if(location && title){
            const img = file && await uploadImage(file);
            const data = { ...inputs, img, type, writer: user.userData._id, latLng: await getGeocode(location)}
            const response = await axios.post(`${POST_SERVER}/post`, data);
            response.data.success ? history.push('/') : alert('Failed to upload post');
        }
        else{
            alert('작성하지 않은 항목이 있습니다.');
        }
    };

    const onInputChange = e => {
        const {name, value} = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    };

    const onCheckedHandler = e => setType(e.target.value);

    return (
        <div className="app">
            <UploadBox>
                <h2>Upload Post</h2>
                {/* title, img, content, location, type */}
                <FormBox onSubmit={onSubmit}>
                    <DropZone setImg={setFile}/>
                    <InputBox type="text" placeholder="*제목을 작성해주세요: 글자수제한(50)"
                        name="title" value={title} onChange={onInputChange}
                    />
                    <InputBox type="text" disabled
                        name="location" value={location} onChange={onInputChange}
                    />
                    <RadioButton checked={type} setChecked={onCheckedHandler}/>
                    <ContentArea name="content" value={content} onChange={onInputChange} placeholder="내용을 작성해주세요" maxLength="2000"/>
                    <PrimaryButton>upload</PrimaryButton>
                </FormBox>
            </UploadBox>  
        </div>
    );
}

export default UploadPage

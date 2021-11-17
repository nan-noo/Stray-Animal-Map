import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import axios from '../../../axios';
import {POST_SERVER, BASE_SERVER} from '../../Config';

const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ZoneBox = styled.div`
    width: 100%;
    height: 7em;
    padding: .9em;
    border: 3px dotted #e0e0e0;
    border-radius: 5px;
    background: #fafafa;
    font-size: 1.8rem;
    color: #aeaeae;
    text-align: center;
`;

function DropZone({setImg}) {
    const [image, setImage] = useState(null)

    const onDrop = useCallback(async acceptedFiles => {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(acceptedFiles[0]);

        const formData = new FormData();
        const config = { header: { "content-type": "multipart/form-data"} };
        formData.append("file", acceptedFiles[0]);
        
        const response = await axios.post(`${POST_SERVER}/image`, formData, config)
        response.data.success ? setImg(`${BASE_SERVER}/${response.data.filePath}`) : alert('Failed to upload image..');
    }, [setImg]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const InputProps = {
        ...getInputProps(),
        multiple: false,
        accept: "image/gif, image/jpg, image/jpeg, image/png",
    };

    return ( 
        <Box>
            <ZoneBox {...getRootProps()} multiple={false}>
                <input {...InputProps} />
                { !image && isDragActive
                    ? <p>Drop the Image here ...</p>
                    : <p>Drag and Drop Image here, <br/> or <br/> Click to select Image(gif, jpg, jpeg, png)</p>
                }
            </ZoneBox>
            {image && <img alt="animal" src={image} style={{width: '7em', height: '7em'}}/>}
        </Box>
    );
}

export default DropZone;

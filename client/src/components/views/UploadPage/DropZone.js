import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const Box = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 48rem) {
        flex-direction: column;
    }
`;

const ZoneBox = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 7em;
    padding: .9em;
    border: 3px dotted #e0e0e0;
    border-radius: 5px;
    background: #fafafa;
    font-size: 1.8rem;
    color: #aeaeae;
    text-align: center;

    @media only screen and (max-width: 48rem) {
        font-size: 0.9rem;
        height: 100%;
    }
`;

const Image = styled.img`
    width: 30%;
    margin-right: 2em;
    border-radius: 3%;
    
    @media only screen and (max-width: 48rem) {
        margin: 1em 0 0;
        order: 2;
    }
`;

function DropZone({setImg}) {
    const [image, setImage] = useState(null)

    const onDrop = useCallback(async acceptedFiles => {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(acceptedFiles[0]);
        setImg(acceptedFiles[0]);
    }, [setImg]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const InputProps = {
        ...getInputProps(),
        multiple: false,
        accept: "image/gif, image/jpg, image/jpeg, image/png",
    };

    return ( 
        <Box>
            {image && <Image alt="animal" src={image}/>}
            <ZoneBox {...getRootProps()} multiple={false}>
                <input {...InputProps} />
                { !image && isDragActive
                    ? <p>Drop the Image here ...</p>
                    : <p>Drag and Drop Image here, <br/> or <br/> Click to select Image(gif, jpg, jpeg, png)</p>
                }
            </ZoneBox>
        </Box>
    );
}

export default DropZone;

import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

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

function DropZone({img}) {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data",
            },
        };
        formData.append("file", acceptedFiles[0]);
        console.log(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const InputProps = {
        ...getInputProps(),
        multiple: false,
        accept: "image/gif, image/jpg, image/jpeg, image/png",
    };

    return (
        <ZoneBox {...getRootProps()} multiple={false}>
            <input {...InputProps} />
            { isDragActive 
                ? <p>Drop the Image here ...</p>
                : <p>Drag and Drop Image here, <br/> or <br/> Click to select Image(gif, jpg, jpeg, png)</p>
            }
        </ZoneBox>
    );
}

export default DropZone;

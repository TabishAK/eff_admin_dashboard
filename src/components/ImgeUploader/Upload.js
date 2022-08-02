import React, { useState } from 'react';
import { CustomInput, FormGroup } from 'reactstrap';
// fileInputState
// fileInputState


export default function Upload({ getCategoryImg}) {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const handleFileInputChange = (e) => {
        getCategoryImg()
        const file = e.target.files[0];
        setFileInputState(e.target.value);
        e.preventDefault();
        if (!file) return;
        else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            console.log(reader, "reader")
            reader.onloadend = () => localStorage.setItem("image_for_upload", reader.result);
            reader.onerror = () => setErrMsg('something went wrong!');
        }
    };


    // const previewFile = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result);
    //     };
    // };

    // const uploadImage = async (base64EncodedImage) => {
    //     try {
    //         await fetch('/api/upload', {
    //             method: 'POST',
    //             body: JSON.stringify({ data: base64EncodedImage }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         setFileInputState('');
    //         setPreviewSource('');
    //         setSuccessMsg('Image uploaded successfully');
    //     } catch (err) {
    //         console.error(err);
    //         setErrMsg('Something went wrong!');
    //     }
    // };


    // const handleSubmitFile = (e) => {
    // e.preventDefault();
    // if (!selectedFile) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    // localStorage.setItem("image_for_upload", JSON.stringify(reader.result))
    // reader.onloadend = () => uploadImage(reader.result);
    // reader.onerror = () => setErrMsg('something went wrong!');
    // };

    return (
        <div>
            {/* <form onSubmit={handleSubmitFile} className="form"> */}
            <CustomInput
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
            />
            {/* </form> */}
        </div>
    );
}

import React, { useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default function UploadBlock({ imageUrl = "", setImageUrl, button = 'Upload' }) {

    const selectImageButton = (
        <div>
            {<PlusOutlined />}
            <div style={{ marginTop: 8 }}>{button}</div>
        </div>
    );

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isJpgOrPng && isLt2M) {
            getBase64(file, imageUrl => {
                setImageUrl(imageUrl)
            });
        }
        return false;
    }

    return (
        <ImgCrop>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
            >
                {imageUrl ?
                    <img src={imageUrl} alt="avatar" style={{ width: '100%', padding: "6px" }} /> /* eslint-disable-line */
                    : selectImageButton}
            </Upload>
        </ImgCrop>
    );
};

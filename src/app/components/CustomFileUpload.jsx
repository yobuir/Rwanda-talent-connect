import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import axios from 'axios';
import axiosInstance from '@/lib/axios';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

const CustomFileUpload = ({ setLogo }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      try {
        const formData = new FormData();
        formData.append('file', info.file.originFileObj);
          const response= await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/media/file-uploader`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        setLoading(false);
        const { url } = response?.data?.data ?? 'https://placehold.co/400';
        setImageUrl(url);
        setLogo(url);
      } catch (error) {
        setLoading(false);
        toast('Error uploading image. Please try again.');
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="logo"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image 
          width={100}
          height={100}
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default CustomFileUpload;

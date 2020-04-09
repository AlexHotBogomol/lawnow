import React from "react";
import {message, Upload, Button} from "antd";
import {useForm} from "react-hook-form";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import axios from 'axios';

const { Dragger } = Upload;

const Schaden = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  const propsForDrager = {
    multiple: false,
    customRequest: ({file, onSuccess, onError}) => {
      const formData = new FormData();
      const data = formData.append('file', file);
      console.log('file', file);
      console.log('data', data);
      axios({
        method: 'post',
        url: '/api/upload/upload.php',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data,
      })
      .then(function (response) {
        console.log(response);
        onSuccess();
      })
      .catch(function (error) {
        console.log(error);
        onError();
      });
    }
  };

  // const props = {
  //   name: 'file',
  //   action: '/api/upload/upload.php',
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <>
      {/*<form action="/api/upload/upload.php" method="post" encType="multipart/form-data">*/}
      {/*  Upload a File:*/}
      {/*  <input type="file" name="file" id="fileToUpload"/>*/}
      {/*  <input type="submit" name="submit" value="Start Upload"/>*/}
      {/*</form>*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<Upload {...props}>*/}
        {/*  <Button>*/}
        {/*    <UploadOutlined /> Click to Upload*/}
        {/*  </Button>*/}
        {/*</Upload>*/}
        <Dragger {...propsForDrager} name="file">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Dokument hierher ziehen oder hier klicken
          </p>
          <p className="ant-upload-hint">
            Einzel- oder Massen-Upload.
          </p>
        </Dragger>
      </form>
    </>
  )
};

export default Schaden;
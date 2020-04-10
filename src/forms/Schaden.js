import React from "react";
import {message, Upload, Button} from "antd";
import {Controller, useForm} from "react-hook-form";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import axios from 'axios';

const { Dragger } = Upload;

const Schaden = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  const propsForDrager = {
    multiple: true,
    customRequest: ({file, onSuccess, onError}) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', "qwerty123");
      axios({
        method: 'post',
        url: '/api/upload/upload.php',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={
          <Dragger {...propsForDrager}>
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
        }
        control={control}
        name="Unfall.Weiteres.Dok"
        id="Unfall.Weiteres.Dok"
      />
      <Button
        htmlType="submit"
        style={{
          width: "100%",
          marginBottom: "30px"
        }}
      >
        Schritt 2 abschließen
      </Button>
    </form>
  )
};

export default Schaden;
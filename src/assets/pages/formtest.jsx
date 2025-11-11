import React from "react";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Form, Input } from "antd";
import instance from "../utilites/api";

const App = () => {
  const [fileList, setFileList] = useState([]);
  const props = {
    name: "poster",
    action: "https://moviesapi.codingfront.dev/api/v1/movies/multi",
    beforeUpload: (file) => {
      setFileList([file]); // ذخیره فایل انتخاب شده
      return false;
    }, // جلوگیری از آپلو

    onChange: (info) => {
      console.log("Change event triggered:", info);
      if (info.file.status !== "uploading") {
        console.log("File info:", info.file);
        console.log("File list:", info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    multiple: false,
  };

  const onFinish = async (values) => {
    console.log("Successss:", values);
    if (fileList.length === 0) {
      message.error("Please select a file before submitting.");
      return;
    }
    await instance.post("movies/multi", {
      ...values,
      country: "ir",
      title: values.title,
    });
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="imdb_id"
        name="imdb_id"
        rules={[{ required: true, message: "Please input imdb_id!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="country"
        name="country"
        rules={[{ required: true, message: "Please input country!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="year"
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input />
      </Form.Item>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;

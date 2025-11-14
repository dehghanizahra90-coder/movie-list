import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Form, Input, Select, Slider } from "antd";
import instance from "../utilites/api";
import convertRate from "../utilites/convert-rate";

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [rottenTomatoes, setRottenTomatoes] = useState(50);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ Rotten_Tomatoes: rottenTomatoes });
  }, [form, rottenTomatoes]);

  const onChangeRotten = (value) => {
    setRottenTomatoes(value); // مقدار محلی را آپدیت کن
    form.setFieldsValue({ Rotten_Tomatoes: value }); // فرم را هم همگام کن
  };

  const props = {
    beforeUpload: (file) => {
      console.log([file])
      setFileList([file]); 
      return false; 
    },
    onRemove: () => {
      setFileList([]);
    },
    multiple: false,
  };

  const onFinish = async (values) => {
    console.log(values.Rotten_Tomatoes);
    if (fileList.length === 0) {
      alert("Please select a poster file before submitting.");
      return;
    }

    try {
      // ایجاد فرم دیتا برای ارسال به صورت multipart/form-data
      const formData = new FormData();
      const valuesArry = Object.entries(values);
      valuesArry.map(function ([key, value]) {
        return formData.append(key, value);
      });
      formData.append("rated", convertRate(values.rated));
      formData.append("poster", fileList[0], `${values.imdb_id}.jpg`); // فایل پوستر واقعی

      const response = await instance.post("movies/multi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Response:", response.data);
      message.success("Movie uploaded successfully!");
    } catch (error) {
      console.error("❌ Upload error:", error);
      message.error("Upload failed!");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Rotten Tomatoes"
        name="Rotten_Tomatoes"
               rules={[{ required: true, message: "Please input Rotten of Film" }]}
      >
        <Slider
          min={1}
          max={100}
          step={1}
          onChange={onChangeRotten}
          value={rottenTomatoes}
        />
      </Form.Item>

      <div style={{ marginBottom: 16 }}>{rottenTomatoes}%</div>

      <Form.Item
        label="rated"
        name="rated"
        rules={[{ required: true, message: "Please input rated of Film " }]}
      >
        <Select
          placeholder="Select Rated"
          // filterOption={(input, option) =>
          //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          // }
          options={[
            { value: "1", label: "G" },
            { value: "2", label: "PG" },
            { value: "3", label: "PG-13" },
            { value: "4", label: "R" },
            { value: "5", label: "NC-17" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input movie title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="IMDb ID"
        name="imdb_id"
        rules={[{ required: true, message: "Please input IMDb ID!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input country!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Poster">
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Click to Upload Poster</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

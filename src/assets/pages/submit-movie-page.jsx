import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Slider, Select, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "../utilites/api";

export default function FormSend() {
  const [inputValue, setInputValue] = useState(1);
  const [rottenTomatoes, setRottenTomatoes] = useState(0);
  const [metaScore, setMetaScore] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>UploadImage</div>
    </button>
  );

  const onChangeImdb = (newValue) => {
    setInputValue(newValue);
  };
  const onChangeRotten = (newValue) => {
    setRottenTomatoes(newValue);
    form.setFieldsValue({ Rotten_Tomatoes: newValue });
    console.log(newValue);
    // console.log(rottenTomatoes);
  };
  const onChangeMeta = (newValue) => {
    setMetaScore(newValue);
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      console.log(info.file.status);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log("info");
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  // const props = {
  //   name: "file",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  function formatDate(date) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  }
  const ratings = [
    { Value: `${inputValue}/10`, Source: "Internet Movie Database" },
    { Value: `${rottenTomatoes}%`, Source: "Rotten Tomatoes" },
    { Value: `${metaScore}/100`, Source: "Metacritic" },
  ]
  const onFinish = async (values) => {
    console.log("Successss:", values);
    console.log(values.imdb_rating, typeof values.imdb_rating);
    console.log(
      values.imdb_rating.toString(),
      typeof values.imdb_rating.toString()
    );

    await instance.post("movies/multi", {
      ...values,
      title: values.title,
      dvd: formatDate(new Date(values.dvd)),
      ratings: JSON.stringify(ratings),
      imdb_rating: values.imdb_rating.toString(),
      metascore: values.metascore.toString(),
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
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
      {/* <Form.Item
        label="director"
        name="director"
        rules={[
          {
            required: true,
            message: "Please input  director of Film and seprated with ,",
          },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label="imdb_rating"
        name="imdb_rating"
        rules={[
          { required: true, message: "Please input  imdb_rating of Film" },
        ]}
      >
        <Slider
          min={1}
          max={10}
          onChange={onChangeImdb}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.1}
        />
      </Form.Item>     
      <Form.Item
        label="Rotten_Tomatoes"
        name="Rotten_Tomatoes"
        rules={[{ required: true, message: "Please input  Rotten of Film" }]}
      >
        <Slider
          min={1}
          max={100}
          onChange={onChangeRotten}
          value={typeof rottenTomatoes === "number" ? rottenTomatoes : 0}
          step={1}
        />
        <div>{rottenTomatoes}%</div>
      </Form.Item>
      <Form.Item
        label="metascore"
        name="metascore"
        rules={[{ required: true, message: "Please input  metascore of Film" }]}
      >
        <Slider
          min={1}
          max={100}
          onChange={onChangeMeta}
          value={typeof metaScore === "number" ? metaScore : 0}
          step={1}
        />
      </Form.Item>
      <Form.Item
        label="imdb_votes"
        name="imdb_votes"
        rules={[
          { required: true, message: "Please input imdb_votes of Film " },
        ]}
      >
        <Input />
      </Form.Item>
      Z
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
      {/* <Form.Item
        label="actors"
        name="actors"
        rules={[{ required: true, message: "Please input actors of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="runtime"
        name="runtime"
        rules={[{ required: true, message: "Please input runtime of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="language"
        name="language"
        rules={[{ required: true, message: "Please input language of Film " }]}
      >
        <Input />
      </Form.Item> */}
      {/* <Form.Item
        label="plot"
        name="plot"
        rules={[{ required: true, message: "Please input plot of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="released"
        name="released"
        rules={[{ required: true, message: "Please input released of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="awards"
        name="awards"
        rules={[{ required: true, message: "Please input awards of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="dvd"
        name="dvd"
        rules={[{ required: true, message: "Please input dvd of Film " }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="box_office"
        name="box_office"
        rules={[
          { required: true, message: "Please input box_office of Film " },
        ]}
      >
        <Input />
      </Form.Item> */}
       <Form.Item
        label="poster"
        name="poster"
        rules={[
          { required: true, message: "Please input  imdb_rating of Film" },
        ]}
      >
        <Upload
          // {...props}
          name="poster"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          // action="https://moviesapi.codingfront.dev/api/v1/movies/multi"
          // beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              draggable={false}
              src={imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

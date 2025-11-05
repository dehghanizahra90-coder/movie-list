import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Slider } from "antd";

export default function FormSend() {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
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
      <Form.Item
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
      </Form.Item>
      <Form.Item
        label="imdb_rating"
        name="imdb_rating"
        rules={[
          { required: true, message: "Please input  imdb_rating of Film  ," },
        ]}
      >
        <Slider
          min={1}
          max={10}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.1}
        />
        {/* <Input /> */}
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
      <Form.Item
        label="poster"
        name="poster"
        rules={[{ required: true, message: "Please input poster of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="rated"
        name="rated"
        rules={[{ required: true, message: "Please input rated of Film " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Form.Item
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
        <Input />
      </Form.Item>
      <Form.Item
        label="box_office"
        name="box_office"
        rules={[
          { required: true, message: "Please input box_office of Film " },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ratings"
        name="ratings"
        rules={[{ required: true, message: "Please input ratings of Film " }]}
      >
        <Input />
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

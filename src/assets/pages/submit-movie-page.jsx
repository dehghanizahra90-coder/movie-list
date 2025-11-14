import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Slider,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import instance from "../utilites/api";
import formatDate from "../utilites/change-date";
import changeArryToString from "../utilites/arry-to-string";
import convertRate from "../utilites/convert-rate";

export default function FormSend() {
  const [fileList, setFileList] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [rottenTomatoes, setRottenTomatoes] = useState(0);
  const [metaScore, setMetaScore] = useState(0);
  const [form] = Form.useForm();
  const onChangeImdb = (newValue) => {
    setInputValue(newValue);
    console.log(inputValue);
  };
  const onChangeRotten = (value) => {
    setRottenTomatoes(value);
    form.setFieldsValue({ Rotten_Tomatoes: value });
  };
  const onChangeMeta = (newValue) => {
    setMetaScore(newValue);
  };

  const props = {
    beforeUpload: (file) => {
      console.log([file]);
      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
    multiple: false,
  };
  useEffect(() => {
    form.setFieldsValue({ Rotten_Tomatoes: rottenTomatoes });
  }, [form, rottenTomatoes]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Image must smaller than 2MB!");
      return;
    }
    return isJpgOrPng && isLt2M;
  };

  const ratings = [
    { Value: `${inputValue}/10`, Source: "Internet Movie Database" },
    { Value: `${rottenTomatoes}%`, Source: "Rotten Tomatoes" },
    { Value: `${metaScore}/100`, Source: "Metacritic" },
  ];
  const onFinish = async (values) => {
    console.log("Successss:", values);
    console.log(values.imdb_rating, typeof values.imdb_rating);
    console.log(
      values.imdb_rating.toString(),
      typeof values.imdb_rating.toString()
    );

    if (fileList.length === 0) {
      alert("Please select a poster file before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      const valuesArry = Object.entries(values);
      valuesArry.map(function ([key, value]) {
        return formData.append(key, value);
      });
      formData.append("actors", changeArryToString(values.actors));
      formData.append("language", changeArryToString(values.language));
      formData.append("country", changeArryToString(values.country));
      formData.append("director", changeArryToString(values.director));
      formData.append("awards", changeArryToString(values.awards));
      formData.append("dvd", formatDate(values.dvd));
      formData.append("rated", convertRate(values.rated));
      console.log(JSON.stringify(ratings));
      formData.append("Rating", JSON.stringify(ratings));
      formData.append("poster", fileList[0], `${values.imdb_id}.jpg`);

      await instance.post("movies/multi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie uploaded successfully!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input placeholder="Please input your title!" />
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
        <Select mode="tags" allowClear style={{ width: "100%" }} />
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
        <Select mode="tags" allowClear style={{ width: "100%" }} />
      </Form.Item>
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
        <Input placeholder="Please input imdb_votes of Film " />
      </Form.Item>
      <Form.Item
        label="rated"
        name="rated"
        rules={[{ required: true, message: "Please input rated of Film " }]}
      >
        <Select
          placeholder="Select Rated"
          options={[
            { value: "G", label: "G" },
            { value: "2", label: "PG" },
            { value: "3", label: "PG-13" },
            { value: "4", label: "R" },
            { value: "5", label: "NC-17" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="actors"
        name="actors"
        rules={[{ required: true, message: "Please input actors of Film " }]}
      >
        <Select mode="tags" allowClear style={{ width: "100%" }} />
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
        <Select mode="tags" allowClear style={{ width: "100%" }} />
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
        <Select mode="tags" allowClear style={{ width: "100%" }} />
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
        <Input prefix="$" />
      </Form.Item>
      <Form.Item label="Poster">
        <Upload {...props} fileList={fileList} beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload Poster</Button>
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

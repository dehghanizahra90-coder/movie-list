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
  const [coverList, setCoverList] = useState([]);
  const [form] = Form.useForm();

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
   const coverProps = {
    beforeUpload: (file) => {
      console.log([file]);
      setCoverList([file]);
      return false;
    },
    onRemove: () => {
      setCoverList([]);
    },
    multiple: false,
  };
  // useEffect(() => {
  //   form.setFieldsValue({ Rotten_Tomatoes: rottenTomatoes });
  // }, [form, rottenTomatoes]);

  // const beforeUpload = (file) => {
  // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   alert("You can only upload JPG/PNG file!");
  //   return;
  // }
  // const isLt2M = file.size / 2048 / 2048 < 2;
  // if (!isLt2M) {
  //   alert("Image must smaller than 2MB!");
  //   return;
  // }
  // return isJpgOrPng && isLt2M;
  //   return false
  // };

  const onFinish = async (values) => {
    const ratings = [
      { Value: `${values.imdb_rating}/10`, Source: "Internet Movie Database" },
      { Value: `${values.rotten_tomatoes}%`, Source: "Rotten Tomatoes" },
      { Value: `${values.metascore}/100`, Source: "Metacritic" },
    ];
    console.log("Successss:", values);
    // console.log(values.imdb_rating, typeof values.imdb_rating);
    // console.log(
    //   values.imdb_rating.toString(),
    //   typeof values.imdb_rating.toString()
    // );

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
      formData.append("writer", changeArryToString(values.writer));
      formData.append("awards", changeArryToString(values.awards));
      formData.append("dvd", formatDate(values.dvd));
      formData.append("rated", convertRate(values.rated));
      formData.append("ratings", JSON.stringify(ratings));

      console.log("kkk", ratings);
      formData.append("poster", fileList[0]);
      formData.append("user_cover", coverList[0]);
      console.log(formData);

      await instance.post("movies/multi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie uploaded successfully!");
    } catch (error) {
      console.log(error);
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
      // onFinishFailed={onFinishFailed}
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
        label="writer"
        name="writer"
        rules={[
          {
            required: true,
            message: "Please input  writer of Film and seprated with ,",
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
          // onChange={onChangeImdb}
          // value={typeof inputValue === "number" ? inputValue : 0}
          step={0.1}
        />
      </Form.Item>
      <Form.Item
        label="Rotten Tomatoes"
        name="rotten_tomatoes"
        rules={[{ required: true, message: "Please input Rotten of Film" }]}
      >
        <Slider
          min={1}
          max={100}
          step={1}
          // onChange={onChangeRotten}
          // value={rottenTomatoes}
        />
      </Form.Item>
      {/* <div style={{ marginBottom: 16 }}>{rottenTomatoes}%</div> */}
      <Form.Item
        label="metascore"
        name="metascore"
        rules={[{ required: true, message: "Please input  metascore of Film" }]}
      >
        <Slider
          min={1}
          max={100}
          // onChange={onChangeMeta}
          // value={typeof metaScore === "number" ? metaScore : 0}
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
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Click to Upload Poster</Button>
        </Upload>
      </Form.Item>
     
      <Form.Item label="user_cover">
        <Upload {...coverProps} fileList={coverList}>
          <Button icon={<UploadOutlined />}>Click to Upload Poster</Button>
        </Upload>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

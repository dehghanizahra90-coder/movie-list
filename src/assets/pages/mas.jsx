import { Fragment, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Slider,
  Upload,
  TreeSelect,
  InputNumber,
  Space,
} from "antd";
import { apiInstance } from "../utils/api";
import moment from "moment";
const { Item } = Form;
const { TextArea } = Input;
export default function SubmiteMoviePage() {
  async function submit(values) {
    console.log(values);
    const actors = values.actors.join(", ");
    const director = values.director.join(", ");
    const writer = values.writer.join(", ");
    const timeDvd = new Date(values.dvd);
    const dvd = moment(timeDvd).format("DD MMM YYYY");
    const timeReleased = new Date(values.released);
    const released = moment(timeReleased).format("DD MMM YYYY");
    const rating = [
      { Value: `${values.imdb_rating}/10`, Source: "Internet Movie Database" },
      { Value: `${values.rotten_rating}%/100%`, Source: "Rotten" },
      { Value: `${values.metacritic_rating}%/100%`, Source: "Metacritic" },
    ];
    const ratingStringified = JSON.stringify(rating);
    const language = values.language.join(", ");
    const awards = values.awards.join(", ");
    const formData = new FormData();
    formData.append("poster", values.poster);
    await apiInstance.post("movies/multi", {
      ...values,
      actors: actors,
      director: director,
      writer: writer,
      dvd: dvd,
      ratings: ratingStringified,
      language: language,
      released: released,
      awards: awards,
      formData,
    });
  }
  const treeData = [
    { value: "G", title: "G" },
    { value: "PG", title: "PG" },
    { value: "PG-13", title: "PG-13" },
    { value: "R", title: "R" },
    { value: "NC-17", title: "NC-17" },
  ];
  const props = {
    action: (https = "//moviesapi.codingfront.dev/images/"),
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Fragment>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={submit}
      >
        <Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder="title name" />
        </Item>
        <Item
          label="Imdb_id"
          name="imdb_id"
          rules={[{ required: true, message: "Please input your imdb_id!" }]}
        >
          <Input placeholder="imdb_id" />
        </Item>
        <Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please input your year!" }]}
        >
          <Input placeholder="Enter year" />
        </Item>
        <Item
          label="country/countries"
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input placeholder="Enter country" />
        </Item>
        <Item
          label="Actors"
          name="actors"
          rules={[{ required: true, message: "Please input your actors!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter actors names"
          />
        </Item>
        <Item
          label="Director/Directors"
          name="director"
          rules={[{ required: true, message: "Please input your director!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter directors names"
          />
        </Item>
        <Item
          label="Writer/Writers"
          name="writer"
          rules={[{ required: true, message: "Please input your writer!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter writers names"
          />
        </Item>
        <Item
          label="Imdb_rating"
          name="imdb_rating"
          getValueFromEvent={(value) => String(value)}
          rules={[
            { required: true, message: "Please input your imdb_rating!" },
          ]}
        >
          <Slider
            defaultValue={0}
            // tooltip={{
            //   open: undefined,
            //   formatter: (value) => ${value}/10,
            // }}
            max={10}
            step={0.1}
          />
        </Item>
        <Item
          label="Rotten Tomatoes Rating"
          name="rotten_rating"
          getValueFromEvent={(value) => String(value)}
          rules={[
            {
              required: true,
              message: "Please input your Rotten Tomatoes Rating!",
            },
          ]}
        >
          <Slider
            defaultValue={0}
            // tooltip={{
            //   open: undefined,
            //   formatter: (value) => ${value}%/100%,
            // }}
            max={100}
            step={1}
          />
        </Item>
        <Item
          label="Metacritic Rating"
          name="metacritic_rating"
          getValueFromEvent={(value) => String(value)}
          rules={[
            {
              required: true,
              message: "Please input your Rotten Tomatoes Rating!",
            },
          ]}
        >
          <Slider
            defaultValue={0}
            // tooltip={{
            //   open: undefined,
            //   formatter: (value) => ${value}%/100%,
            // }}
            max={100}
            step={1}
          />
        </Item>
        <Item
          label="Imdb_votes"
          name="imdb_votes"
          rules={[{ required: true, message: "Please input your imdb_votes!" }]}
        >
          <Input placeholder="Enter imdb votes" />
        </Item>
        <Item
          label="Dvd"
          name="dvd"
          rules={[{ required: true, message: "Please input dvd movie!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Item>
        <Item
          label="Rated"
          name="rated"
          getValueFromEvent={(value) => String(value)}
          rules={[{ required: true, message: "Please input your rated!" }]}
        >
          <TreeSelect
            treeData={treeData}
            placeholder="Please select your category"
            allowClear
            showSearch
          />
        </Item>
        <Item
          label="Runtime(Minutes)"
          name="runtime"
          rules={[{ required: true, message: "Please input your runtime!" }]}
        >
          <Space>
            <InputNumber style={{ width: "100%" }} addonAfter="min" />
          </Space>
        </Item>
        <Item
          label="Language"
          name="language"
          rules={[{ required: true, message: "Please input your language!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter language"
          />
        </Item>
        <Item
          label="Plot"
          name="plot"
          rules={[{ required: true, message: "Please input your imdb_votes!" }]}
        >
          <TextArea placeholder="Enter plot" />
        </Item>
        <Item
          label="Released"
          name="released"
          rules={[{ required: true, message: "Please input released movie!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Item>
        <Item
          label="Awards"
          name="awards"
          rules={[{ required: true, message: "Please input your language!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter awards movie"
          />
        </Item>
        <Item
          label="Box office"
          name="box_office"
          rules={[{ required: true, message: "Please input box_office!" }]}
        >
          <Space>
            <InputNumber style={{ width: "100%" }} addonAfter="$" />
          </Space>
        </Item>
        <Item
          label="Poster"
          name="poster"
          rules={[{ required: true, message: "Please input your language!" }]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Item>

        <Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Fragment>
  );
}

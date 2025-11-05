import { Col, Divider, Row } from "antd";

export function ListMovie(data) {
  return (
    <Row gutter={16}>
      {data.data.map(function ({ id, poster, title }) {
        <Col className="gutter-row" span={6} key={id}>
          <li>
            <h6>{title}</h6>
            <img src={poster} />
          </li>
        </Col>;
      })}
    </Row>
  );
}

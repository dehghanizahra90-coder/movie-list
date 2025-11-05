import React from "react";
import { Pagination } from "antd";
export function Pagination({ defaultCurrent, total, pageSize, current }) {
  return (
    <Pagination
      defaultCurrent={defaultCurrent}
      total={total}
      pageSize={pageSize}
      current={current}
    />
  );
}

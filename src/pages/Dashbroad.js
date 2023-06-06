import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Age",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Trang thái",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const Dashbroad = () => {
  const data = [
    {
      type: "Tháng 1",
      sales: 38,
    },
    {
      type: "Tháng 2",
      sales: 52,
    },
    {
      type: "Tháng 3",
      sales: 61,
    },
    {
      type: "Tháng 4",
      sales: 145,
    },
    {
      type: "Tháng 5",
      sales: 48,
    },
    {
      type: "Tháng 6",
      sales: 38,
    },
    {
      type: "Tháng 7",
      sales: 38,
    },
    {
      type: "Tháng 8",
      sales: 38,
    },
    {
      type: "Tháng 9",
      sales: 38,
    },
    {
      type: "Tháng 10",
      sales: 38,
    },
    {
      type: "Tháng 11",
      sales: 38,
    },
    {
      type: "Tháng 12",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Thu nhập",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Thống kê</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Đơn hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashbroad;

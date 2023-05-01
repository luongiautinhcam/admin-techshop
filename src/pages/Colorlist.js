import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColors } from "../features/color/colorSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên màu",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      action: (
        <>
          <Link className="fs-3 text-danger" to="/">
            <BiEdit />
          </Link>
          <Link className="fs-3 text-danger ms-3" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách màu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Colorlist;

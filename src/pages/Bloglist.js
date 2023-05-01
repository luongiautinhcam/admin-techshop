import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
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
      <h3 className="mb-4 title">Danh sách bài viết</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Bloglist;

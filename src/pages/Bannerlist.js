import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteABlog, getBlogs } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Banner",
    dataIndex: "title",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Bannerlist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      action: (
        <>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách banner</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Bạn có muốn xoá banner"
      />
    </div>
  );
};

export default Bannerlist;

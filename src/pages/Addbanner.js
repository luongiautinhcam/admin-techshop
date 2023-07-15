import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên sản phẩm không được để trống"),
  decscription: yup.string().required("Mô tả không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
});

const Addbanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBannerId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBannerId !== undefined) {
      dispatch(getABlog(getBannerId));
      img.push(blogImg);
    } else {
      dispatch(resetState());
    }
  }, [getBannerId]);
  const newBlog = useSelector((state) => state.blog);
  const { blogName, blogCategory, blogDecs, blogImg } = newBlog;
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  // const newBlog = useSelector((state) => state.blog);
  // const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  // useEffect(() => {
  //   if (isSuccess && createdBlog) {
  //     toast.success("Thêm bài thành công!");
  //   }
  //   if (isError) {
  //     toast.error("Có lỗi gì đó!");
  //   }
  // }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      decscription: blogDecs || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBannerId !== undefined) {
        const data = { id: getBannerId, blogData: values };
        dispatch(updateABlog(data));
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-list");
        }, 100);
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-list");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBannerId !== undefined ? "Chỉnh sửa" : "Thêm"} banner
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="bg-white border-1  p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBannerId !== undefined ? "Chỉnh sửa" : "Thêm"} banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbanner;

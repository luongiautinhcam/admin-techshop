import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createBlogs, resetState } from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên sản phẩm không được để trống"),
  decscription: yup.string().required("Mô tả không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blog.blogs);
  const { isSuccess, isError, isLoading, createdBlog } = blogState;
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
  }, [img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      decscription: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 300);
    },
    // onSubmit: (values) => {
    //   if (getBlogId !== undefined) {
    //     const data = { id: getBlogId, blogData: values };
    //     dispatch(updateABlog(data));
    //     setTimeout(() => {
    //       dispatch(resetState());
    //       navigate("/admin/blog-list");
    //     }, 100);
    //   } else {
    //     dispatch(createBlogs(values));
    //     formik.resetForm();
    //     setTimeout(() => {
    //       dispatch(resetState());
    //       navigate("/admin/blog-list");
    //     }, 300);
    //   }
    // },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm bài viết</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Tiêu đề bài viết"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Chọn danh mục bài viết</option>
            {bCatState?.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="decscription"
            onChange={formik.handleChange("decscription")}
            value={formik.values.decscription}
          />
          <div className="error">
            {formik.touched.decscription && formik.errors.decscription}
          </div>
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
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
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
            Thêm bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;

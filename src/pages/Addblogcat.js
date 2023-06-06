import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createBlogCategories,
  getABlogCategory,
  resetState,
  updateABlogCategory,
} from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên danh mục không được để trống"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const { blogCategoryName } = newBlogCategory;
  useEffect(() => {
    if (getBCatId !== undefined) {
      dispatch(getABlogCategory(getBCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBCatId]);

  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBCatId !== undefined) {
        const data = { id: getBCatId, bCatData: values };
        dispatch(updateABlogCategory(data));
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-category-list");
        }, 100);
      } else {
        dispatch(createBlogCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-category-list");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh mục bài viết
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Nhập danh mục bài viết"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh mục bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;

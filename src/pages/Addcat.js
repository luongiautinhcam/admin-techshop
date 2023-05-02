import React from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createCategories } from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên danh mục không được để trống"),
});
const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategories(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm danh mục</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Nhập tên danh mục"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;

import React from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createColors } from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Màu không được để trống"),
});
const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColors(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-color");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm màu</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Chọn màu"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm màu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;

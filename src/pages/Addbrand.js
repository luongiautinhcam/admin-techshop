import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createBrands,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên hãng không được để trống"),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const { brandName } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-brand");
        }, 100);
      } else {
        dispatch(createBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-brand");
        }, 300);
      }

      
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Chỉnh sửa" : "Thêm"} hãng
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Nhập tên hãng"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Chỉnh sửa" : "Thêm"} hãng
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;

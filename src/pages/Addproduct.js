import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên sản phẩm không được để trống"),
  decscription: yup.string().required("Mô tả không được để trống"),
  price: yup.number().required("Giá sản phẩm không được để trống"),
  brand: yup.string().required("Hãng không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
  color: yup.array().required("Màu không được để trống"),
  quantity: yup.number().required("Số lượng sản phẩm không được để trống"),
});
const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);

  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      _id: i._id,
      color: i.title,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color;
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      decscription: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });
  // const [desc, setDesc] = useState();
  // const handleDesc = (e) => {
  //   setDesc(e);
  // };
  return (
    <div className="mb-4 title">
      <h3>Thêm sản phẩm</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Nhập tên sản phẩm"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="decscription"
              onChange={formik.handleChange("decscription")}
              value={formik.values.decscription}
            />
            <div className="error">
              {formik.touched.decscription && formik.errors.decscription}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Nhập giá sản phẩm"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Chọn hãng</option>
            {brandState?.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Chọn danh mục</option>
            {categoryState?.map((i, j) => {
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
          <Multiselect
            name="color"
            dataKey="id"
            textField="color"
            data={colors}
            onChange={(e) => setColor(e)}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            name="quantity"
            label="Nhập số lượng sản phẩm"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1  p-5 text-center">
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
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Tên sản phẩm không được để trống"),
  decscription: yup.string().required("Mô tả không được để trống"),
  price: yup.number().required("Giá sản phẩm không được để trống"),
  brand: yup.string().required("Hãng không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
  tags: yup.string().required("Nhãn dán không được để trống"),
  color: yup.string().required("Màu không được để trống"),
  quantity: yup.number().required("Số    lượng sản phẩm không được để trống"),
});
const Editproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    productName,
    productDecs,
    productPrice,
    productBrand,
    productCategory,
    productTags,
    productColor,
    productQuantity,
  } = newProduct;

  const imgOldState = useSelector((state) => state.product.productImages);
  const imgOldState1 = useSelector((state) => state.product.productImages1);
  const imgOldState2 = useSelector((state) => state.product.productImages2);
  const imgOldState3 = useSelector((state) => state.product.productImages3);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  console.log(img);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      decscription: productDecs || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      color: productColor || "",
      quantity: productQuantity || "",
      images: img,
      _id: getProductId,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (selectedFiles.length === 0) {
        const dataToSend = { ...values };
        delete dataToSend.images;
        // alert(JSON.stringify(dataToSend));

        const data = { id: getProductId, productData: dataToSend };
        dispatch(updateAProduct(data));
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/product-list");
        }, 100);
      } else {
        // alert(JSON.stringify(values));
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/product-list");
        }, 100);
      }
    },
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
    dispatch(uploadImg(files));
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Chỉnh sửa" : "Thêm"} sản phẩm
      </h3>
      <div className="">
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
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          {/* danh muc */}
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
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          {/* Nhan */}
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Chọn nhãn dán
            </option>
            <option value="news">Mới</option>
            <option value="sale">Giảm giá</option>
            <option value="special">Đặc biệt</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          {/* mau sac */}
          <select
            name="color"
            onChange={formik.handleChange("color")}
            onBlur={formik.handleBlur("color")}
            value={formik.values.color}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Chọn màu sắc</option>
            {colorState?.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
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
          <div className="showimages d-flex flex-wrap gap-3">
            <input
              className="bg-white border-1  p-5 text-center"
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              // onChange={(e) => dispatch(uploadImg(e.target.files))}
              onChange={handleFileChange}
            />
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <h5>Hình ảnh sản phẩm hiện tại</h5>
          <div className="d-flex">
            <img
              src={
                imgOldState
                  ? imgOldState
                  : "https://cdn.tgdd.vn/Products/Images/54/253802/bluetooth-airpods-pro-magsafe-charge-apple-mlwk3-0-1.jpg"
              }
              alt=""
              width={200}
              height={200}
            />
            <img
              src={
                imgOldState1
                  ? imgOldState1
                  : "https://cdn.tgdd.vn/Products/Images/54/253802/bluetooth-airpods-pro-magsafe-charge-apple-mlwk3-0-1.jpg"
              }
              alt=""
              width={200}
              height={200}
            />
            <img
              src={
                imgOldState2
                  ? imgOldState2
                  : "https://cdn.tgdd.vn/Products/Images/54/253802/bluetooth-airpods-pro-magsafe-charge-apple-mlwk3-0-1.jpg"
              }
              alt=""
              width={200}
              height={200}
            />
            <img
              src={
                imgOldState3
                  ? imgOldState3
                  : "https://cdn.tgdd.vn/Products/Images/54/253802/bluetooth-airpods-pro-magsafe-charge-apple-mlwk3-0-1.jpg"
              }
              alt=""
              width={200}
              height={200}
            />
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Chỉnh sửa" : "Thêm"} sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;

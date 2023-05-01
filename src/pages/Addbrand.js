import React from "react";
import CustomInput from "../components/CustomInput";

const Addbrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm hãng</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Nhập hãng" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm hãng
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;

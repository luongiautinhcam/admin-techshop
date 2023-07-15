import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import { updateAUserByAdmin } from "../features/auth/authSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Điện thoại",
    dataIndex: "mobile",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        action: (
          <>
            <select
              name=""
              defaultValue={
                customerstate[i].isBlocked
                  ? customerstate[i].isBlocked
                  : "false"
              }
              className="form-control form-select"
              id=""
              onChange={(e) =>
                setUserStatus(e.target.value, customerstate[i]._id)
              }
            >
              <option value="true">Bị khoá</option>
              <option value="false">Đang hoạt động</option>
            </select>
          </>
        ),
      });
    }
  }
  //Cạp nhật trang thái yêu cầu
  const setUserStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, userData: e };
    dispatch(updateAUserByAdmin(data));
  };
  return (
    <div>
      <h3 className="mb-4 title">Khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { deleteAOrder, updateAOrder } from "../features/order/orderSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Thành tiền",
    dataIndex: "amount",
    sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
  },
  {
    title: "Ngày lập",
    dataIndex: "date",
    // sorter: (a, b) => {
    //   const dateA = new Date(a.date);
    //   const dateB = new Date(b.date);

    //   if (dateA < dateB) {
    //     return -1;
    //   }
    //   if (dateA > dateB) {
    //     return 1;
    //   }
    //   return 0;
    // },
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orderId, setorderId] = useState("");
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const showModal = (e) => {
    setOpen(true);
    setorderId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    const createdAt = new Date(orderState[i].createdAt);
    const formattedDate = `${createdAt
      .getDate()
      .toString()
      .padStart(2, "0")}/${(createdAt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${createdAt.getFullYear()} ${createdAt
      .getHours()
      .toString()
      .padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`;

    data1.push({
      key: i + 1,
      name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
      product: <Link to={`/admin/`}>Xem đơn hàng</Link>,
      amount: Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(orderState[i].totalPriceAfterDiscount),
      date: formattedDate,
      status: (
        <>
          <select
            name=""
            defaultValue={
              orderState[i].orderStatus
                ? orderState[i].orderStatus
                : "Da dat hang"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setOrderStatus(e.target.value, orderState[i]._id)}
          >
            <option value="Da dat hang">Đã đặt hàng</option>
            <option value="Da thanh toan">Đã thanh toán</option>
            <option value="Chua xac nhan">Chưa xác nhận</option>
            <option value="Da xac nhan">Đã xác nhận</option>
            <option value="Cho giao hang">Chờ giao hàng</option>
            <option value="Dang giao hang">Đang giao hàng</option>
            <option value="Da giao hang">Đã giao hàng</option>
            <option value="Da huy">Đã huỷ</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/order/${orderState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(orderState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setOrderStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, orderData: e };
    dispatch(updateAOrder(data));
  };
  //Xoá đơn hàng
  const deleteOrder = (e) => {
    dispatch(deleteAOrder(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getOrders());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrder(orderId);
        }}
        title="Bạn có muốn xoá đơn hàng"
      />
    </div>
  );
};

export default Orders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { getAOrder, updateAOrder } from "../features/order/orderSlice";
import { Link } from "react-router-dom";
import { getProducts } from "../features/product/productSlice";
import { useState } from "react";

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[3];
  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);
  const orderState = useSelector((state) => state.order);
  const orderDetailState = useSelector((state) => state.order.orders);
  const orderProdItemsState = useSelector(
    (state) => state.order.orders.orderItems
  );
  const {
    orderFirstName,
    orderLastName,
    orderMobile,
    orderAddress,
    orderAddressState,
    orderCity,
    orderZipcode,
    orderOther,
    orderStatus,
  } = orderState;

  const goBack = () => {
    navigate(-1);
  };
  const setOrderStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, orderData: e };
    dispatch(updateAOrder(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAOrder(getOrderId));
    }, 100);
  };
  //Tong tien
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < orderProdItemsState?.length; index++) {
      sum =
        sum +
        Number(orderProdItemsState[index].quantity) *
          orderProdItemsState[index].price;
      setTotalAmount(sum);
    }
  }, [orderProdItemsState]);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Xem chi tiết đơn hàng</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Trở về
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Địa Chỉ Nhận Hàng
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6">Mã đơn hàng</h3>
                      <strong>Giaohangnhanh </strong>
                      <span>
                        <Link
                          to="#"
                          className="text-decoration-underline"
                          target="_blank"
                        >
                          {getOrderId}
                        </Link>{" "}
                        <i className="bi bi-box-arrow-up-right"></i>{" "}
                      </span>
                      <hr />
                      <h3 className="h6">Địa chỉ</h3>
                      <address>
                        <strong>{orderFirstName + " " + orderLastName}</strong>
                        <br />
                        {orderAddress}
                        <br />
                        {orderAddressState}, {orderCity} {orderZipcode}
                        <br />0{orderMobile}
                      </address>
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6">Lưu ý khách hàng</h3>
                      <p>{orderOther}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Thay đổi trạng thái đơn hàng:</h6>
                    <div>
                      <select
                        name=""
                        defaultValue={orderStatus ? orderStatus : "Da dat hang"}
                        className="form-control form-select"
                        id=""
                        onChange={(e) =>
                          setOrderStatus(e.target.value, getOrderId)
                        }
                      >
                        <option value="Da dat hang">Đã đặt hàng</option>
                        <option value="Da thanh toan">Đã thanh toán</option>
                        <option value="Chua xac nhan">Chưa xác nhận</option>
                        <option value="Da xa nhan">Đã xác nhận</option>
                        <option value="Cho giao hang">Chờ giao hàng</option>
                        <option value="Dang giao hang">Đang giao hàng</option>
                        <option value="Da giao hang">Đã giao hàng</option>
                        <option value="Da huy">Đã huỷ</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Danh sách sản phẩm
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-lg-20">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between">
                          <div></div>
                          <div className="d-flex">
                            <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                              <i className="bi bi-download"></i>
                              <span className="text">Hoá đơn</span>
                            </button>
                            <div className="dropdown">
                              <button
                                className="btn btn-link p-0 text-muted"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                <i className="bi bi-three-dots-vertical"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <i className="bi bi-pencil"></i> Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <i className="bi bi-printer"></i> Print
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <table className="table table-borderless">
                          <tbody>
                            {orderProdItemsState?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex mb-2">
                                      <div className="flex-shrink-0">
                                        <img
                                          src={`${item?.product.images[0].url}`}
                                          alt=""
                                          width="80"
                                          className="img-fluid"
                                        />
                                      </div>
                                      <div className="flex-lg-grow-1 ms-3">
                                        <h6 className="small mb-0">
                                          <Link to="#" className="text-reset">
                                            {item?.product.title}
                                          </Link>
                                        </h6>
                                        <span className="small">
                                          Color: {item?.color.title}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>Số lượng: {item?.quantity}</td>
                                  <td className="text-end">
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(item?.product.price)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="2">Tổng tiền</td>
                              <td className="text-end">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalAmount)}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">Phí vận chuyển</td>
                              <td className="text-end">50.000đ</td>
                            </tr>
                            <tr>
                              <td colSpan="2">Mã giảm giá (Code: NEWYEAR)</td>
                              <td className="text-danger text-end">-$10.00</td>
                            </tr>
                            <tr className="fw-bold">
                              <td colSpan="2">Thành tiền</td>
                              <td className="text-end">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  orderDetailState.totalPriceAfterDiscount
                                )}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Thông tin đơn hàng
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

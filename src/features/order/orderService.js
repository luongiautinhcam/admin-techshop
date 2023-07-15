import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}order/${id}`, config);
  return response.data;
};

const updateOrder = async (order) => {
  const response = await axios.put(
    `${base_url}order/${order.id}`,
    { orderStatus: order.orderData },
    config
  );
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_url}order/${id}`, config);
  return response.data;
};
const orderService = {
  getOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;

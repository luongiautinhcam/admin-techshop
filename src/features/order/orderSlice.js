import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

export const getAOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAOrder = createAsyncThunk(
  "order/update-order",
  async (order, thunkAPI) => {
    try {
      return await orderService.updateOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAOrder = createAsyncThunk(
  "order/delete-order",
  async (id, thunkAPI) => {
    try {
      return await orderService.deleteOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.orderFirstName = action.payload.shippingInfo.firstName;
        state.orderLastName = action.payload.shippingInfo.lastName;
        state.orderMobile = action.payload.shippingInfo.mobile;
        state.orderAddress = action.payload.shippingInfo.address;
        state.orderAddressState = action.payload.shippingInfo.state;
        state.orderCity = action.payload.shippingInfo.city;
        state.orderZipcode = action.payload.shippingInfo.zipcode;
        state.orderOther = action.payload.shippingInfo.other;
        state.orderStatus = action.payload.orderStatus;
      })
      .addCase(getAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
        toast.success("Cập nhật trạng thái thành công!");
      })
      .addCase(updateAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedOrder = action.payload;
        toast.success("Xoá thắc mắc thành công!");
      })
      .addCase(deleteAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default ordersSlice.reducer;

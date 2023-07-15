import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProductCategory = createAsyncThunk(
  "productCategory/get-product-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategories = createAsyncThunk(
  "productCategory/create-categories",
  async (categoryData, thunkAPI) => {
    try {
      return await pCategoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAProductCategory = createAsyncThunk(
  "productCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await pCategoryService.updateProductCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProductCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pCategorySlice = createSlice({
  name: "pCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createPCategories = action.payload;
        toast.success("Thêm danh mục thành công!");
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Có lỗi gì đó!");
      })
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
        toast.success("Chỉnh sửa thành công!");
      })
      .addCase(updateAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
        toast.success("Xoá thành công!");
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Không thể xoá danh mục sản phẩm");
      })
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;

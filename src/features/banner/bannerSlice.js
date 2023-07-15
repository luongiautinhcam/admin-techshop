import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bannerService from "./bannerService";
import { toast } from "react-toastify";

export const getBanners = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bannerService.getBanners();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const getABlogCategory = createAsyncThunk(
//   "blogCategory/get-blog-category",
//   async (id, thunkAPI) => {
//     try {
//       return await bCategoryService.getBlogCategory(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const createBanner = createAsyncThunk(
  "blogCategory/create-categories",
  async (bannerData, thunkAPI) => {
    try {
      return await bannerService.createBanner(bannerData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const updateABlogCategory = createAsyncThunk(
//   "blogCategory/update-category",
//   async (blogcategory, thunkAPI) => {
//     try {
//       return await bCategoryService.updateBlogCategory(blogcategory);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const deleteABlogCategory = createAsyncThunk(
//   "blogCategory/delete-category",
//   async (id, thunkAPI) => {
//     try {
//       return await bCategoryService.deleteBlogCategory(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const resetState = createAction("Reset_all");

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bannerSlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBCategories = action.payload;
        toast.success("Thêm danh mục bài viết thành công!");
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Có lỗi gì đó!");
      })
      // .addCase(getABlogCategory.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getABlogCategory.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.blogCategoryName = action.payload.title;
      // })
      // .addCase(getABlogCategory.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      // .addCase(updateABlogCategory.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateABlogCategory.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.updatedBlogCategory = action.payload;
      //   toast.success("Chỉnh sửa thành công!");
      // })
      // .addCase(updateABlogCategory.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      // .addCase(deleteABlogCategory.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteABlogCategory.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.deletedBlogCategory = action.payload;
      //   toast.success("Xoá thành công!");
      // })
      // .addCase(deleteABlogCategory.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      .addCase(resetState, () => initialState);
  },
});

export default bannerSlice.reducer;

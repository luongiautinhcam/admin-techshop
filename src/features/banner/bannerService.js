import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getBanners = async () => {
  const response = await axios.get(`${base_url}banner/`);
  return response.data;
};

const createBanner = async (banner) => {
  const response = await axios.post(
    `${base_url}banner/`,
    banner,
    config
  );
  return response.data;
};

// const updateBlogCategory = async (blogcategory) => {
//   const response = await axios.put(
//     `${base_url}blogcategory/${blogcategory.id}`,
//     { title: blogcategory.bCatData.title },
//     config
//   );
//   return response.data;
// };

// const getBlogCategory = async (id) => {
//   const response = await axios.get(`${base_url}blogcategory/${id}`, config);
//   return response.data;
// };

// const deleteBlogCategory = async (id) => {
//   const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
//   return response.data;
// };

const bannerService = {
  getBanners,
  createBanner,
};

export default bannerService;

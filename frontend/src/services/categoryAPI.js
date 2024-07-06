import axios from "axios";
const baseURL = "http://localhost:8000/api/v1/categories";

//!Create
export const addCategoryAPI = async (formData) => {
  const response = await axios.post(`${baseURL}/create`, formData, {
    withCredentials: true,
  });

  return response.data;
};

//!List
export const fetchCategoriesAPI = async () => {
  const response = await axios.get(`${baseURL}`);
  return response.data;
};

// !Get post detail
// export const getPostAPI = async (postId) => {
//   const response = await axios.get(`${baseURL}/${postId}`);
//   return response.data;
// };
//!Update post detail
// export const updatePostAPI = async ({ postId, title, description }) => {
//   const response = await axios.put(`${baseURL}/${postId}`, {
//     title,
//     description,
//   });
//   return response.data;
// };
// //!Delete post
// export const deletePostAPI = async (postId) => {
//   const response = await axios.delete(`${baseURL}/${postId}`);
//   return response.data;
// };

import axios from "axios";
const baseURL = "http://localhost:8000/api/v1/plans";

//!Create
export const addPlanAPI = async (formData) => {
  const response = await axios.post(`${baseURL}/create`, formData, {
    withCredentials: true,
  });

  return response.data;
};

//!List
export const fetchPlansAPI = async () => {
  const response = await axios.get(`${baseURL}`, { withCredentials: true });
  return response.data;
};

//!Get a plan
export const getPlanAPI = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
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

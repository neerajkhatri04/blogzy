import axios from "axios";
const baseURL = "http://localhost:8000/api/v1";

//!Create
export const createPostAPI = async (formData) => {
  const response = await axios.post(`${baseURL}/posts/create`, formData, {
    withCredentials: true,
  });

  return response.data;
};

//!List
export const listPostAPI = async (filters) => {
  console.log("apifilter", filters);
  const response = await axios.get(`${baseURL}/posts`, {
    params: filters,
    withCredentials: true,
  });
  return response.data;
};

//!Get post detail
export const getPostAPI = async (postId) => {
  const response = await axios.get(`${baseURL}/posts/${postId}`);
  return response.data;
};
//!Update post detail
export const updatePostAPI = async ({ postId, title, description }) => {
  const response = await axios.put(`${baseURL}/posts/${postId}`, {
    title,
    description,
  });
  return response.data;
};
//!Delete post
export const deletePostAPI = async (postId) => {
  const response = await axios.delete(`${baseURL}/posts/${postId}`);
  return response.data;
};

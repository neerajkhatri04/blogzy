import axios from "axios";
const baseURL = "http://localhost:8000/api/v1";

export const registerAPI = async ({ username, email, password }) => {
  const response = await axios.post(
    `${baseURL}/users/register`,
    {
      username,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const loginAPI = async ({ username, password }) => {
  const response = await axios.post(
    `${baseURL}/users/login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//!Logout API
export const logoutAPI = async () => {
  const response = await axios.post(
    `${baseURL}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const checkAuthStatusAPI = async () => {
  const response = await axios.get(`${baseURL}/users/checkAuthenticated`, {
    withCredentials: true,
  });
  return response.data;
};

//!Profile API
export const profileAPI = async () => {
  const response = await axios.get(`${baseURL}/users/profile`, {
    withCredentials: true,
  });
  return response.data;
};

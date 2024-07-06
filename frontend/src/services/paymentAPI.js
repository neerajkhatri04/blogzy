import axios from "axios";
const baseURL = "http://localhost:8000/api/v1/payments";

//!Create
export const paymentAPI = async (id) => {
  const response = await axios.post(
    `${baseURL}/create-order`,
    {
      subscriptionPlanId: id,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//!Free
export const freePlanAPI = async () => {
  const response = await axios.get(`${baseURL}/free-plan`, {
    withCredentials: true,
  });

  return response.data;
};

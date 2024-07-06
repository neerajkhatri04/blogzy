import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { checkAuthStatusAPI } from "../../services/userAPI";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../redux/slices/authSlices";

const profile = () => {
  //!use query
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryFn: checkAuthStatusAPI,
    queryKey: ["get-profile"],
  });
  //!Dispatch

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  return <div>profile</div>;
};

export default profile;

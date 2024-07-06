import { useQuery } from "@tanstack/react-query";
import React from "react";
import { checkAuthStatusAPI } from "../../services/userAPI";
import AuthCheckingComponent from "../Alerts/AuthCheckingComponent";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["auth-status"],
    queryFn: checkAuthStatusAPI,
  });

  if (isLoading) {
    return <AuthCheckingComponent />;
  }

  if (!data) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthRoute;

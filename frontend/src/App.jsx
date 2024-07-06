import Home from "./components/Home/Home";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";
import PostList from "./components/Posts/PostList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatusAPI } from "./services/userAPI";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "./redux/slices/authSlices";
import { useEffect } from "react";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UserDashbaord from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummary";
import AddCategory from "./components/Category/AddCategory";
import CreatePlan from "./components/Plans/CreatePlan";
import Pricing from "./components/Plans/Pricing";
import PayingPremiumPlan from "./components/Plans/PayingPremiumPlan";
import PayingFreePlan from "./components/Plans/PayingFreePlan";
function App() {
  //!use query
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryFn: checkAuthStatusAPI,
    queryKey: ["check-auth"],
  });
  console.log("data", data);
  //!Dispatch

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  const { userAuth } = useSelector((state) => state.auth);
  console.log("userAuth: ", userAuth);
  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashbaord />}>
          {/* Account summery */}
          <Route
            path=""
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
          />
          {/* Create Post */}
          <Route
            path="create-post"
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
          />
          {/* Create Category */}
          <Route
            path="add-category"
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
          />
          {/*Create Plan */}
          <Route
            path="add-plan"
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
          />
          <Route
            path="free-subscription"
            element={
              <AuthRoute>
                <PayingFreePlan />
              </AuthRoute>
            }
          />
          <Route
            path="premium-subscription/:planId"
            element={
              <AuthRoute>
                <PayingPremiumPlan />
              </AuthRoute>
            }
          />
          <Route
            path="add-plan"
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
          />
        </Route>

        {/* List posts */}
        <Route path="/posts" element={<PostList />} />
        {/*Post detail */}
        <Route path="/posts/:postId" element={<PostDetails />} />
        {/* Update post detail */}
        {/* <Route path="/posts/:postId" element={<UpdatePost />} /> */}
        {/* User login */}
        <Route path="/login" element={<Login />} />
        {/* User register */}
        <Route path="/register" element={<Register />} />
        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

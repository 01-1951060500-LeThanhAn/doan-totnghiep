import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/page";
import { useEffect } from "react";
import HomePage from "./pages/home/page";
import { useAppDispatch } from "./hooks/hooks";
import { logOut } from "./redux/slices/authSlice";
import setAuthToken from "./lib/setAuthToken";
import DashBoardLayout from "./layouts/layout";

import { jwtDecode, JwtPayload } from "jwt-decode";
import EditProductPage from "./pages/products/product-edit/page";
import AddProductPage from "./pages/products/product-add/page";
import EditUserPage from "./pages/users/user-edit/page";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      dispatch(logOut());
      navigate("/dashboard/login");
    } else {
      setAuthToken(localStorage.getItem("token"));
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken && decodedToken.exp) {
          const expireTime = decodedToken.exp * 1000;
          if (Date.now() > expireTime) {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route
        path="/dashboard/add-product"
        element={
          <DashBoardLayout>
            <AddProductPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/edit-product/:productId"
        element={
          <DashBoardLayout>
            <EditProductPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/edit-user/:userId"
        element={
          <DashBoardLayout>
            <EditUserPage />
          </DashBoardLayout>
        }
      />
    </Routes>
  );
};

export default App;

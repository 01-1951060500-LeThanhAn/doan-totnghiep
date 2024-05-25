import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/hooks";
import { logOut } from "./redux/slices/authSlice";
import setAuthToken from "./lib/setAuthToken";
import { jwtDecode, JwtPayload } from "jwt-decode";

import routes from "./routes";

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
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default App;

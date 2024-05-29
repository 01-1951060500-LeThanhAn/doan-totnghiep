import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/hooks";
import { logOut } from "./redux/slices/authSlice";
import setAuthToken from "./lib/setAuthToken";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import routes from "./routes";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            dispatch(logOut());
            navigate("/dashboard/login");
            toast.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
          } else {
            setAuthToken(localStorage.getItem("token"));
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      dispatch(logOut());
      navigate("/dashboard/login");
      toast.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    }
  }, [dispatch, navigate]);

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

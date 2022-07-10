import { Navigate, Outlet } from "react-router-dom";

const AuthUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthUser;

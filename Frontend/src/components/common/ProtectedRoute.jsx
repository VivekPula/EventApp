import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

export const ProtectedRoute = () => {
  const redirectPath = useLocation().pathname; // To redirect back to this location after signup/login

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ redirectPath }} />
  );
};

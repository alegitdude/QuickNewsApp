import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { UserState } from "../models/user";

export default function ProtectedRoute() {
  const user: UserState = useSelector((store: RootState) => store.user);

  const location = useLocation();

  if (!user.username) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

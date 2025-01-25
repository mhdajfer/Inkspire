import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoutes() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

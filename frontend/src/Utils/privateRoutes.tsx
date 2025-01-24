import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoutes() {
  const { isUserLoggedIn } = useAuth();
  return <>{isUserLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

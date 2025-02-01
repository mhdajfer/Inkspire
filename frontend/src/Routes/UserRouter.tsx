import { UserLayout } from "@/components/Layout/UserLayout";
import { LandingPage } from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import { Login } from "@/pages/Login";
import Signup from "@/pages/SignUp";
import PrivateRoutes from "@/Utils/privateRoutes";
import { Route, Routes } from "react-router";
import ProfilePage from "@/pages/user/ProfilePage";

export default function UserRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/*" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  );
}

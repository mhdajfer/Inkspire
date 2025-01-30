import { UserLayout } from "@/components/Layout/UserLayout";
import PrivateRoutes from "@/Utils/privateRoutes";
import { Route, Routes } from "react-router";
import CreateBlogPage from "@/pages/user/CreateBlogPage";

export default function BlogRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/create" element={<CreateBlogPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

import { UserLayout } from "@/components/Layout/UserLayout";
import PrivateRoutes from "@/Utils/privateRoutes";
import { Route, Routes } from "react-router";
import CreateBlogPage from "@/pages/user/CreateBlogPage";
import SingleBlogPage from "@/pages/blog/SingleBlogPage";
import MyPostsPage from "@/pages/blog/MyPostsPage";
import EditPostPage from "@/pages/blog/EditPostPage";

export default function BlogRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/:id" element={<SingleBlogPage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/edit" element={<EditPostPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

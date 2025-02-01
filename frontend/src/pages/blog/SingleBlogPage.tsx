import { SingleBlog } from "@/components/SingleBlog";
import { IBlog } from "@/Types/IBlog";
import { axiosInstance } from "@/Utils/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const SingleBlogPage = () => {
  const location = useLocation();

  const urlPaths = location.pathname.split("/").filter((segament) => segament);

  const postId = urlPaths[urlPaths.length - 1];
  const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    async function getBlog() {
      try {
        const {
          data,
        }: { data: { success: boolean; message: string; data: IBlog } } =
          await axiosInstance.get(`/blogs/${postId}`);

        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBlog();
  }, [postId]);
  return (
    <div className="min-h-screen bg-background py-12">
      {blog && <SingleBlog blog={blog} />}
    </div>
  );
};

export default SingleBlogPage;

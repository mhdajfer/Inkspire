import { BlogCard } from "@/components/BlogCard";
import { IBlog } from "@/Types/IBlog";
import { axiosInstance } from "@/Utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MyPostsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogs() {
      try {
        const {
          data,
        }: { data: { success: boolean; message: string; data: IBlog[] } } =
          await axiosInstance.get("/blogs/myblogs");

        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBlogs();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mx-48 mt-20">
      {blogs.map((post) => (
        <div className="" key={post._id}>
          <BlogCard
            onClick={(id) => navigate(`/blog/${id}`)}
            post={post}
            ownAccount={true}
          />
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;

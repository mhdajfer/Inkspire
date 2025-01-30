import { SingleBlog } from "@/components/SingleBlog";
import { IBlog } from "@/Types/IBlog";

const SingleBlogPage = ({ post }: { post: IBlog }) => {
  return (
    <div className="min-h-screen bg-background py-12">
      <SingleBlog blog={post} />
    </div>
  );
};

export default SingleBlogPage;

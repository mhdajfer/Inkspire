import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { blogs } from "@/Utils/Consts";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoggedIn() {
  const navigate = useNavigate();
  return (
    <>
      <main className="">
        <div className="flex items-center justify-between md:px-32 mt-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Inspire with Blog
            </h2>
            <p className="text-muted-foreground mt-2">
              Manage and create your blog posts
            </p>
          </div>
          <Button onClick={() => navigate("/blog/create")}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
        <section className="py-12">
          <div className="container px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <div className="" key={post._id}>
                  <BlogCard onClick={() => toast.info("delete")} post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

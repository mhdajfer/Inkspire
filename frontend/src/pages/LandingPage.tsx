import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { BlogCard } from "@/components/BlogCard";
import { toast } from "sonner";
import { IBlog } from "@/Types/IBlog";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/Utils/axios";

export function LandingPage() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const {
          data,
        }: { data: { success: boolean; message: string; data: IBlog[] } } =
          await axiosInstance.get("/blogs");

        if (data.success) {
          setBlogs(data.data);
        } else toast.error(data.message);
      } catch (error) {
        console.log("error while getting data", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b">
        <div className="container px-4 py-20 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">DevBlog</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-[700px] mx-auto">
            Exploring the world of technology, development, and everything in
            between. Join us on this journey of continuous learning and
            discovery.
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={() => navigate("/login")}>
              Subscribe to Our Newsletter
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post) => (
              <div className="" key={post._id}>
                <BlogCard
                  onClick={(id: string) => toast.info(id)}
                  post={post}
                  setBlogs={setBlogs}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container px-4 py-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Want to Contribute?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-[600px] mx-auto">
            Share your knowledge with our growing community. We welcome articles
            on development, design, and technology.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Start Writing
          </Button>
        </div>
      </section>
    </div>
  );
}

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { blogs as posts } from "@/Utils/Consts";
import { useNavigate } from "react-router";

export function LandingPage() {
  const navigate = useNavigate();
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
          <div className="grid gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-[2/1] relative">
                  <img
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-2xl">
                    <a href={`/posts/${post.id}`} className="hover:underline">
                      {post.title}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    By {post.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {post.date}
                  </div>
                </CardFooter>
              </Card>
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

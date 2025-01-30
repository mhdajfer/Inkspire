import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IBlog } from "@/Types/IBlog";

interface BlogDetailProps {
  blog: IBlog;
}

export function SingleBlog({ blog }: BlogDetailProps) {
  return (
    <article className="container max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <header className="space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-x-2">
              <CalendarDays className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {blog.updatedAt !== blog.createdAt && (
              <div className="flex items-center gap-x-2">
                <Clock className="h-4 w-4" />
                Updated{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {blog.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-center gap-x-2">
          <img
            src={`https://i.pravatar.cc/150?u=${blog.author}`}
            alt={blog.author}
            className="h-10 w-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">{blog.author}</p>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage || "/placeholder.svg"}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <Separator className="my-8" />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {/* Split content by paragraphs and map them */}
        {blog.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground">
        <p>
          Published on{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </footer>
    </article>
  );
}

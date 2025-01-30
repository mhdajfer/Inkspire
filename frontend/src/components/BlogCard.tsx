import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBlog } from "@/Types/IBlog";

interface PostCardProps {
  post: IBlog;
  onClick: (id: string) => void;
}

export function BlogCard({ post, onClick }: PostCardProps) {
  // Get the first 150 characters of content
  const excerpt =
    post.content.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          {post.tags && post.tags.length > 0 && (
            <Badge variant="secondary">{post.tags[0]}</Badge>
          )}
          <h3 className="font-semibold text-xl leading-tight">
            <a href={`/posts/${post._id}`} className="hover:underline">
              {post.title}
            </a>
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        className="flex-1 cursor-pointer"
        onClick={() => {
          onClick(post._id);
        }}
      >
        {post.coverImage && (
          <div className="aspect-video relative mb-4">
            <img
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        )}
        <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <img
              src={`https://i.pravatar.cc/150?u=${post.author}`}
              alt={post.author}
              className="rounded-full h-8 w-8"
            />
            <span className="text-sm font-medium">{post.author}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

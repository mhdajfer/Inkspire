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
import { S3URL } from "@/Utils/Consts";
import { useNavigate } from "react-router";
import { axiosInstance } from "@/Utils/axios";
import { toast } from "sonner";

interface PostCardProps {
  post: IBlog;
  ownAccount?: boolean;
  onClick: (id: string) => void;
  setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>;
}

export function BlogCard({
  post,
  onClick,
  ownAccount = false,
  setBlogs,
}: PostCardProps) {
  const navigate = useNavigate();
  // Get the first 150 characters of content
  const excerpt =
    post.content.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  async function handleDelete(id: string) {
    try {
      const {
        data,
      }: { data: { success: boolean; message: string; data: null } } =
        await axiosInstance.delete(`/blogs/${id}`);

      if (data.success) {
        setBlogs((prevBlogs: IBlog[]) =>
          prevBlogs.filter((blog) => blog._id !== id)
        );
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        {ownAccount && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigate("/blog/edit", { state: post });
                }}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(post._id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent
        className="flex-1 cursor-pointer"
        onClick={() => {
          onClick(post._id);
        }}
      >
        {post._id && (
          <div className="aspect-video relative mb-4">
            <img
              src={`${S3URL}/Image-${post._id}.jpg`}
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
              src={
                typeof post.author == "object"
                  ? `${S3URL}/Image-${post.author._id}.jpg`
                  : `https://i.pravatar.cc/150?u=${post.author}`
              }
              alt={"profile picture"}
              className="rounded-full h-8 w-8"
            />
            <span className="text-sm font-medium">
              {typeof post.author == "object"
                ? post.author.fullName
                : post.author}
            </span>
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

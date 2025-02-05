import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { useNavigate } from "react-router";

interface EmptyPostsProps {
  isAuthor?: boolean;
}

export function EmptyPosts({ isAuthor = false }: EmptyPostsProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-2xl font-semibold tracking-tight mb-2">
        No posts yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        {isAuthor
          ? "You haven't written any posts yet. Start writing and share your thoughts with the world!"
          : "There are no blog posts published yet. Check back later for new content."}
      </p>
      {isAuthor && (
        <Button onClick={() => navigate("/blog/create")}>
          <PenLine className="mr-2 h-4 w-4" />
          Create your first post
        </Button>
      )}
    </div>
  );
}

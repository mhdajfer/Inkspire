"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, ImagePlus } from "lucide-react";
import {
  blogEditFormSchema,
  type BlogEditFormValues,
} from "../validations/blogEditFormSchema";
import { IBlog } from "@/Types/IBlog";
import { S3URL } from "@/Utils/Consts";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface EditBlogFormProps {
  blog: IBlog;
  onSubmit: (blog: Partial<IBlog> & { coverImage?: File | null }) => void;
  isLoading?: boolean;
}

export function EditBlogForm({
  blog,
  onSubmit,
  isLoading = false,
}: EditBlogFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

  const form = useForm<BlogEditFormValues>({
    resolver: zodResolver(blogEditFormSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
      tags: blog.tags || [],
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      const currentTags = form.getValues("tags");

      if (!currentTags.includes(newTag) && currentTags.length < 5) {
        form.setValue("tags", [...currentTags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size and format
      if (file.size > 5 * 1024 * 1024) {
        form.setError("coverImage", {
          type: "manual",
          message: "File size must be less than 5MB.",
        });
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        form.setError("coverImage", {
          type: "manual",
          message: "Unsupported file format. Use PNG, JPG, or WEBP.",
        });
        return;
      }

      form.setValue("coverImage", file);
      form.clearErrors("coverImage");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmitForm = (data: Partial<IBlog>) => {
    onSubmit({
      author: currentUserId,
      _id: blog._id,
      title: data.title,
      content: data.content,
      coverImage: data.coverImage instanceof File ? data.coverImage : undefined,
      tags: data.tags,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)}>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your blog title"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isLoading}
                        className="hidden"
                        {...field}
                        ref={fileInputRef}
                      />
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                          className="w-full"
                        >
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Change Image
                        </Button>
                      </div>
                      <div className="aspect-video relative mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={
                            imagePreview
                              ? imagePreview
                              : `${S3URL}/Image-${blog._id}.jpg`
                          }
                          alt="Cover preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Maximum file size: 5MB. Supported formats: PNG, JPG,
                        WEBP
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        disabled={isLoading || field.value.length >= 5}
                      />
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-destructive"
                                disabled={isLoading}
                                aria-label={`Remove ${tag} tag`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here..."
                      className="min-h-[300px] resize-y"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                form.reset({
                  title: blog.title,
                  content: blog.content,
                  tags: blog.tags || [],
                });
                setImagePreview(null);
                setTagInput("");
              }}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

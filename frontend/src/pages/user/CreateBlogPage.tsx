import { CreateBlogForm } from "@/components/CreateBlogForm";
import { IBlog } from "@/Types/IBlog";
import { axiosInstance } from "@/Utils/axios";
import { getUploadUrl, uploadFileToS3 } from "@/Utils/s3Service";
import { toast } from "sonner";

export default function CreateBlogPage() {
  const handleCreateBlog = async (
    blogData: Omit<IBlog, "_id" | "createdAt" | "updatedAt">
  ) => {
    if (!blogData.coverImage) return;

    try {
      console.log(blogData);

      const coverFile: File | string = blogData.coverImage;

      delete blogData.coverImage;
      const {
        data,
      }: { data: { success: boolean; message: string; data: IBlog } } =
        await axiosInstance.post("/blogs", { blogData });

      if (!data.success) return toast.error(data.message);

      const filename = "Image-" + data.data._id + ".jpg";
      const response = await getUploadUrl(filename, "image/jpeg");

      if (response.success) {
        await uploadFileToS3(response.uploadUrl, coverFile as File);
        toast.success("blog uploaded successfully");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <CreateBlogForm onSubmit={handleCreateBlog} />
    </div>
  );
}

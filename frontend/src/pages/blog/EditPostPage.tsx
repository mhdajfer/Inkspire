import { EditBlogForm } from "@/components/EditBlogForm";
import { IBlog } from "@/Types/IBlog";
import { axiosInstance } from "@/Utils/axios";
import { getUploadUrl, uploadFileToS3 } from "@/Utils/s3Service";
// import { BlogEditFormValues } from "@/validations/blogEditFormSchema";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const isEqual = (arr1: string[], arr2: string[]): boolean => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};
const EditPostPage = () => {
  const navigate = useNavigate();
  const { state }: { state: IBlog } = useLocation();

  async function submitForm(
    blogData: Partial<IBlog> & { coverImage?: File | null }
  ) {
    console.log("jhjh", blogData);

    if (blogData.coverImage) {
      const filename = "Image-" + blogData._id + ".jpg";
      const response = await getUploadUrl(filename, "image/jpeg");
      if (response.success) {
        await uploadFileToS3(response.uploadUrl, blogData.coverImage as File);
        navigate("/home");
        toast.success("image updated successfully");
      }
    }

    if (
      state.content == blogData.content &&
      state.title == blogData.title &&
      isEqual(state.tags as string[], blogData.tags as string[])
    ) {
      return toast.info("no changes made");
    }

    try {
      const {
        data,
      }: { data: { success: boolean; message: string; data: IBlog } } =
        await axiosInstance.put(`/blogs/${blogData._id}`, { blogData });

      if (data.success) {
        navigate("/blog/my-posts");
        toast.success(data.message);
      }
    } catch (error) {
      console.log("error while editing blog", error);
    }
  }
  return (
    <div>
      <div className="min-h-screen bg-background py-12 px-4">
        <EditBlogForm blog={state} onSubmit={submitForm} />
      </div>
    </div>
  );
};

export default EditPostPage;

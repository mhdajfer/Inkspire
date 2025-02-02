import { ProfileView } from "@/components/ProfileView";
import { userUpdate } from "@/store/reducers/authReducer";
import { RootState } from "@/store/store";
import { IUser } from "@/Types/IUser";
import { axiosInstance } from "@/Utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const handleEditProfile = async (userData: Partial<IUser>) => {
    if (
      userData.fullName == currentUser?.fullName &&
      userData.email == currentUser?.email &&
      userData.phoneNo == currentUser?.phoneNo &&
      userData.phoneNo
    ) {
      return toast.info("No change detected");
    }
    console.log(userData);
    try {
      const {
        data,
      }: { data: { success: true; message: string; data: IUser } } =
        await axiosInstance.put("/users", { userData });

      if (data.success) {
        dispatch(userUpdate({ user: data.data }));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("image", file);

      // Simulate API call
      console.log("Uploading image:", file.name);

      // In real implementation, you would make an API call here
      // await uploadProfileImage(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      {currentUser && (
        <ProfileView
          user={currentUser}
          onEditClick={handleEditProfile}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

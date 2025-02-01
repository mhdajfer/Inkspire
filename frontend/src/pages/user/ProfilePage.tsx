import { ProfileView } from "@/components/ProfileView";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const handleEditProfile = () => {
    // Handle profile update
    console.log("Profile updated");
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

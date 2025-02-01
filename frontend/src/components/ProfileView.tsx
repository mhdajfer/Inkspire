"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Mail, Phone, Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/Types/IUser";
import { S3URL } from "@/Utils/Consts";
import { getUploadUrl, uploadFileToS3 } from "@/Utils/s3Service";
import { toast } from "sonner";

interface ProfileViewProps {
  user: IUser;
  onEditClick?: () => void;
  onImageUpload?: (file: File) => void;
}

export function ProfileView({
  user,
  onEditClick,
  onImageUpload,
}: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [imageFile, setimageFile] = useState<File | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      onEditClick?.();
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setimageFile(null);
    setIsEditing(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("clicked");
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setimageFile(file);
        setpreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageUpload?.(file);
    }
  };

  const handleSaveImage = async () => {
    try {
      const filename = "Image-" + user._id + ".jpg";
      const response = await getUploadUrl(filename, "image/jpeg");

      if (response.success) {
        await uploadFileToS3(response.uploadUrl, imageFile as File);

        toast.success("image updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="relative">
          <div className="absolute right-4 top-4 flex gap-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit profile</span>
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex flex-col justify-center items-center">
              <Avatar
                className="w-24 h-24 cursor-pointer relative group"
                onClick={handleImageClick}
              >
                <AvatarImage
                  src={previewImage || `${S3URL}/Image-${user._id}.jpg`}
                  alt="Profile picture"
                />
                <AvatarFallback className="bg-green-400">
                  {user.fullName[0]}
                </AvatarFallback>

                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium">Change</span>
                </div>
              </Avatar>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                aria-label="Change profile picture"
              />
              {previewImage.length > 0 && (
                <button
                  onClick={handleSaveImage}
                  className="px-1 py-1 mt-3 text-xs text-white rounded bg-violet-950 hover:bg-violet-900 transition-colors duration-300"
                >
                  Save Image
                </button>
              )}
            </div>
            <div className="text-center space-y-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="sr-only">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={editedUser.fullName}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, fullName: e.target.value })
                    }
                    className="text-center text-xl font-bold"
                  />
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="text-center"
                  />
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl">
                    {editedUser.fullName}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    {editedUser.email}
                  </CardDescription>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={editedUser.phoneNo}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phoneNo: e.target.value })
                    }
                  />
                ) : (
                  <span>{editedUser.phoneNo}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>Member since {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}

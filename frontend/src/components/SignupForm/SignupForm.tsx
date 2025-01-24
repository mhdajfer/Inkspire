"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { IUser } from "@/Types/IUser";
import { toast } from "sonner";
import { axiosInstance } from "@/Utils/axios";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNo: string;
}

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const {
        data,
      }: { data: { success: boolean; message: string; data: IUser } } =
        await axiosInstance.post("/users", { formData });

      if (data.success) {
        toast(data.message);
      }
    } catch (err) {
      toast.warning("user already existing!..");

      console.log("Error: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px] border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNo">Phone Number</Label>
              <Input
                id="phoneNo"
                name="phoneNo"
                placeholder=" phone number"
                type="phoneNo"
                disabled={isLoading}
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 dark:text-red-400">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign up
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className={cn(
                  "underline underline-offset-4 hover:text-primary",
                  isLoading && "pointer-events-none opacity-50"
                )}
              >
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

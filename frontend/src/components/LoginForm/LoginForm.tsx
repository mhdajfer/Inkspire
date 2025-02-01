"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./Icons";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { axiosInstance } from "@/Utils/axios";
import { IUser } from "@/Types/IUser";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/store/reducers/authReducer";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const isUserLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  useEffect(() => {
    if (isUserLoggedIn) navigate("/home");
  }, [isUserLoggedIn, navigate]);

  async function onSubmit(loginData: LoginFormInputs) {
    setIsLoading(true);

    try {
      const {
        data,
      }: {
        data: { success: boolean; message: string; user: IUser; token: string };
      } = await axiosInstance.post("/users/login", loginData);

      if (data.success) {
        toast.success("Login successful");
        dispatch(userLogin({ user: data.user, token: data.token }));
        
        navigate("/home");
      }
    } catch (error) {
      console.log("Error while login", error);
      toast.warning("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center">
      <div className="grid gap-4 max-w-md mx-auto">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

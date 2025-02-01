"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { userLogout } from "@/store/reducers/authReducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between  px-10 md:px-36">
        <div className="mr-4 ">
          <a
            className="mr-6 flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className=" font-bold">ACME Inc</span>
          </a>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <a className="flex items-center" href="/">
              <span className="font-bold">ACME Inc</span>
            </a>
            <nav className="mt-8 flex flex-col space-y-3">
              <a
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                onClick={() => navigate("/login")}
              >
                SignIn
              </a>

              <a
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                onClick={() => navigate("/register")}
              >
                SignUp
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="items-center justify-between space-x-2 hidden md:flex">
          {isLoggedIn ? (
            <nav className="flex space-x-5">
              <Button
                variant="outline"
                className="hidden md:flex *:"
                onClick={() => dispatch(userLogout())}
              >
                Logout
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/blog/my-posts")}>
                    My Posts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="hidden md:flex"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="hidden md:flex"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

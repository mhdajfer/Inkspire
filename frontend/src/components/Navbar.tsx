"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/authContext";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a
            className="mr-6 flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="hidden font-bold sm:inline-block">ACME Inc</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.title}
              </a>
            ))}
          </nav>
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
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          {isUserLoggedIn ? (
            <nav>
              <Button
                variant="outline"
                className="hidden md:flex *:"
                onClick={() => setIsUserLoggedIn(false)}
              >
                Logout
              </Button>
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

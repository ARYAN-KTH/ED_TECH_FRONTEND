import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  ShoppingBag,
  Menu,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items with icons for recruiters
const recruiterItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Courses",
    url: "/create-course",
    icon: GraduationCap,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

// Menu items with icons for students/talent
const talentItems = [
  {
    title: "All Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Enrolled Courses",
    url: "/enrolled-course",
    icon: BookOpen,
  },
  {
    title: "Purchase History",
    url: "/purchase-history",
    icon: ShoppingBag,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ModernSidebar({ className }: SidebarProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const [userRole] = useState<"Instructor" | "Student">(user.role);
  const items = userRole === "Instructor" ? recruiterItems : talentItems;

  return (
    <div className={cn("pb-12", className)}>
      {/* Header with Logo */}
      <div className="px-6 py-6 flex items-center border-b">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h2 className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          EduTech
        </h2>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-600 text-white">{user?.firstName[0]}{user?.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user?.firstName} {user?.lastName}</h3>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="px-4 py-6">
        <nav className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600",
                location.pathname === item.url 
                  ? "bg-blue-50 text-blue-600" 
                  : "hover:bg-blue-50/50"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4",
                location.pathname === item.url 
                  ? "text-blue-600"
                  : "text-gray-400"
              )} />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <ModernSidebar />
      </SheetContent>
    </Sheet>
  );
}

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Home, 
  Inbox, 
  Search, 
  Settings, 
  BookOpen, 
  Heart, 
  ShoppingBag,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Menu items with icons for recruiters
const recruiterItems = [
  {
    title: "Dashboard",
    url: "/create-course",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "#",
    icon: Inbox,
  },
  {
    title: "My Courses",
    url: "/create-course",
    icon: Calendar,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

// Menu items with icons for students/talent
const talentItems = [
  {
    title: "My Profile",
    url: "#",
    icon: Home,
  },
  {
    title: "Enrolled Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Wishlist",
    url: "#",
    icon: Heart,
  },
  {
    title: "Purchase History",
    url: "#",
    icon: ShoppingBag,
  },
  {
    title: "Course",
    url: "/course-details",
    icon: Calendar,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ModernSidebar({ className }: SidebarProps) {
  const location = useLocation();
  // TODO: Replace with actual user role detection
  const [userRole] = useState<'recruiter' | 'talent'>('recruiter');
  
  // Choose menu items based on user role
  const items = userRole === 'recruiter' ? recruiterItems : talentItems;

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {items.map((item) => (
              <Button
                key={item.title}
                variant={location.pathname === item.url ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link to={item.url} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <ModernSidebar className="px-2" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
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
]

const TalentItems = [
  {
    title: "My Profile",
    url: "#",
    icon: Home,
  },
  {
    title: "Enrollerd Courses",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Wishlist",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Purchase History",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Course",
    url: "#",
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
]

console.log(TalentItems)

export function AppSidebar() {
  return (
    <SidebarProvider>
    <Sidebar className = "mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                    <span><item.icon/></span>
                    {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
  )
}


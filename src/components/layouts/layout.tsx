import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/uiComponents/ProtectedNavbar";
import { ModernSidebar, MobileSidebar } from "@/components/uiComponents/ModernSidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center px-4">
          <MobileSidebar />
          <Navbar />
        </div>
      </header>
      
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden md:block w-64 border-r bg-gray-50/40 overflow-y-auto">
          <ModernSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;

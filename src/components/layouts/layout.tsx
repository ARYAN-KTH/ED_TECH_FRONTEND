import React from "react";
import { Outlet } from "react-router-dom";
import {
  ModernSidebar,
  MobileSidebar,
} from "@/components/uiComponents/ModernSidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50/40">
      {/* Top Navbar - Mobile Only */}
      <header className="sticky top-0 z-30 md:hidden bg-white border-b shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <MobileSidebar />
          <div className="flex items-center">
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduTech
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed inset-y-0 z-50">
          <div className="flex flex-col h-full w-64 bg-white border-r shadow-sm">
            <ModernSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto px-4 py-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

import Navbar from "@/components/uiComponents/ProtectedNavbar";
import { AppSidebar } from "@/components/uiComponents/Sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-[250px] fixed left-0 top-16 bottom-0 bg-gray-800 text-white">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-[250px] p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;


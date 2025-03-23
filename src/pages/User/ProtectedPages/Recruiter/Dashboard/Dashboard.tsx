import { Hammer } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        <div className="flex justify-center text-gray-500 mb-4">
          <Hammer size={50} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">This Page is Under Construction</p>
        <p className="text-gray-500 text-sm mt-2">Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default Dashboard;

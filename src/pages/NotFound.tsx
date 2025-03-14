import { Link } from "react-router-dom";
import { Ghost, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-xl border border-slate-100">
        <div className="flex justify-center">
          <div className="relative">
            <Ghost size={120} className="text-indigo-500 animate-pulse" />
            <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
              404
            </div>
          </div>
        </div>
        
        <h1 className="mt-6 text-3xl font-bold text-center text-slate-800">Page Not Found</h1>
        
        <p className="mt-4 text-center text-slate-600">
          Looks like this page has vanished into the digital void.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg transition-all hover:bg-indigo-600 hover:shadow-md"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 transition-all hover:bg-slate-50 hover:shadow-sm"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-slate-500">
        Lost? Try searching for what you need or contact support.
      </div>
    </div>
  );
};

export default NotFound;
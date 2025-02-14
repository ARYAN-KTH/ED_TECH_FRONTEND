import { Link } from "react-router-dom";
import GenerateInitialsImage from "../../helper/NameImageGenerator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 z-50 shadow-md">
      {/* Desktop Navbar */}
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyBrand
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Catalog
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Auth Links / User Profile */}
        <div className="flex items-center gap-6">
          {!user?.firstName ? (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-500 py-1 px-4 rounded-full hover:bg-gray-200 transition duration-300"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full hover:cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <GenerateInitialsImage
                firstname={user?.firstName}
                lastname={user?.lastName}
              />
            </div>
          )}
        </div>

        {/* Hamburger Icon (Mobile View) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-white hover:text-gray-200 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalog
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-200 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-200 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!user?.firstName ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-500 py-1 px-4 rounded-full hover:bg-gray-200 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <div
                className="w-10 h-10 rounded-full hover:cursor-pointer"
                onClick={() => {
                  navigate("/home");
                  setIsMenuOpen(false);
                }}
              >
                <GenerateInitialsImage
                  firstname={user?.firstName}
                  lastname={user?.lastName}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

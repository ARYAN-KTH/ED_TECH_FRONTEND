"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">Logo</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/course">Courses</NavLink>
              <NavLink to="/about-us">About us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden transition-all duration-300 ease-in-out`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/home">Home</MobileNavLink>
          <MobileNavLink to="/catalog">Catalog</MobileNavLink>
          <MobileNavLink to="/about">About us</MobileNavLink>
          <MobileNavLink to="/contact">Contact</MobileNavLink>
          <MobileNavLink to="/login">Login</MobileNavLink>
          <MobileNavLink
            to="/signup"
            className="bg-blue-500 text-white block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Sign up
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${className}`}
  >
    {children}
  </Link>
)

const MobileNavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${className}`}
  >
    {children}
  </Link>
)

export default Navbar


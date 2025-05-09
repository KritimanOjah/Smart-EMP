import React, { useEffect, useState } from "react";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LogOutUser = () => {
    handleLogout();
  };

  return (
    <header
      className={`fixed top-15 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-50
      bg-[#fde9ce]  rounded-full w-[25%] max-w-7xl px-4 py-1 
      ${
        showHeader
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center h-8">
        <div className="flex items-center space-x-6">
          

          <div className="hidden md:flex space-x-1">
            <a
              href="#"
              className="text-gray-800 font-medium text-sm whitespace-nowrap px-1 py-1 rounded-md transition-all duration-300 ease-in-out border border-transparent hover:border-black hover:scale-[1.03]"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-800 font-medium text-sm whitespace-nowrap px-1 py-1 rounded-md transition-all duration-300 ease-in-out border border-transparent hover:border-black hover:scale-[1.03]"
            >
              Blog
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={LogOutUser}
            className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:opacity-90 transition-opacity duration-200 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 whitespace-nowrap"
          >
            Logout
          </button>

          <button
            className="md:hidden p-1 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Open menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;



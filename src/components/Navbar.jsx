import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const { logout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleConfirmLogout = async () => {
    await logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base sm:text-xl px-2 sm:px-3 py-1 rounded">
                LS
              </div>
              <span className="font-bold text-lg sm:text-xl group-hover:text-blue-600 transition">
                LinkSnip
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
              )}

              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base"
              >
                Profile
              </Link>

              <button
                onClick={handleLogoutClick}
                className="px-3 lg:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium text-sm lg:text-base"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t pt-4">
              {user && (
                <div className="text-sm text-gray-600 mb-3 pb-3 border-b">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </div>
              )}
              
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogoutClick}
                className="w-full text-left py-2.5 px-3 mt-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Navbar;

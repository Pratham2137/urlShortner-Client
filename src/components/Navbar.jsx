import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const { logout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded">
                LS
              </div>
              <span className="font-bold text-xl group-hover:text-blue-600 transition">
                LinkSnip
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {user && (
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
              )}

              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
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

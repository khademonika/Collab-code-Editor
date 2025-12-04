
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Code2, Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user, isLogin } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
  ];

  return (
    <>
      <nav
        className="w-full shadow-sm home fixed  z-30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <Link to="/" className="text-2xl font-extrabold tracking-wide">
              CollabIDE
            </Link>

          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex cursor-pointer items-center gap-8">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="text-lg font-medium  transition-colors">
                {link.name}
              </Link>
            ))}
            {/* Auth Buttons */}
            {!user ? (
              <Link to="/login">
                <button
                  className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium border">
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/join-room")}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Join Room
                </button>

                <button
                  onClick={logout}
                  className="px-4 cursor-pointer bg-red-600 text-white py-2 rounded-lg text-sm font-medium ">
                  Logout
                </button>
                <Link to="/settings">
                  <button
                    className="px-4 py-2 rounded-lg text-sm bg-gray-600 text-white transition-all-smooth font-medium ">
                    Settings
                  </button>
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-300" />
              ) : (
                <Moon className="text-black" />
              )}
            </button>
          </div>

         
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-4 space-y-4 ">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="block text-lg font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {(!user && !isLogin) ? (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full cursor-pointer px-4 py-2 border rounded-lg">
                  Login
                </button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/join-room");
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Join Room
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="w-full flex cursor-pointer items-center justify-center gap-2 py-2 mt-2 border rounded-lg"
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-300" />
              ) : (
                <Moon className="text-black" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

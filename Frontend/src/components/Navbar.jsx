import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Track auth state using JWT (localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        {/* Left arrows */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>

          {user ? (
            <>
              {/* Upload button */}
              <p
                onClick={() => navigate("/upload")}
                className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-purple-600 transition-colors"
              >
                ⬆️ Upload
              </p>

              {/* Logout button */}
              <p
                onClick={handleLogout}
                className="bg-red-600 py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-red-700 transition-colors"
              >
                Logout
              </p>

              {/* Profile icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
                title={user.name || user.email}
              />
            </>
          ) : (
            // Login button if no token
            <p
              onClick={() => navigate("/login")}
              className="bg-purple-500 text-black w-16 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition"
            >
              Login
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;


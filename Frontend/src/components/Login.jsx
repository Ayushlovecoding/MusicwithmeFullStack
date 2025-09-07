import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ added

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ added

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setMessage("✅ Login successful!");
      console.log("Login Response:", res.data);

      // ✅ Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect after login
      navigate("/upload");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("👋 Logged out successfully");
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
        )}

        {/* ✅ Register link */}
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 underline">
            Register here
          </Link>
        </p>

        {/* ✅ Logout button */}
        <button
          onClick={handleLogout}
          type="button"
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;

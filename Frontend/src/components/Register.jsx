import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // ✅ added

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ added

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.message || "✅ Registration successful!");
      console.log("Register Response:", res.data);

      // ✅ navigate after success
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 rounded text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
        )}

        {/* ✅ Added Login link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

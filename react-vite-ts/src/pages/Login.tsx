import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { login, loading, error, success } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await login({ email, password });
    if (user) navigate(`/${user.role}-dashboard`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-gray-900 border border-purple-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide text-purple-700">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-purple-50 placeholder-gray-500 text-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-purple-50 placeholder-gray-500 text-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full mt-4 bg-purple-100 hover:bg-purple-200 py-3 rounded-lg font-semibold text-gray-700 transition-all"
        >
          Create an Account
        </button>
      </form>
    </div>
  );
};

export default Login;

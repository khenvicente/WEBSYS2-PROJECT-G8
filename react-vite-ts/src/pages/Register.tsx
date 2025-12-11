import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { register, loading, error, success } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("wizard");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !username || !name) {
      return;
    }

    const user = await register({
      email,
      password,
      username,
      name,
      role,
    });

    if (user) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-purple-900 mb-2">
            ✨ Famili
          </h1>
          <p className="text-gray-600">Create your magical account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-purple-200"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
            Register
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="wizard@magic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-200"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-purple-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 characters
            </p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-200"
              required
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-200"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-200 cursor-pointer"
            >
              <option value="wizard">🧙 Wizard (Sell Familiars)</option>
              <option value="customer">👤 Customer (Buy Familiars)</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              <p className="text-sm font-medium">
                {success} — Redirecting to login...
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-4 bg-purple-100 hover:bg-purple-200 py-3 rounded-lg font-semibold transition-all text-gray-700 border border-purple-200"
          >
            Already have an account? Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By registering, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Register;
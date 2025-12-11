import { useState } from "react";
import { api } from "../api/axiosClient";

interface AuthResponse {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    role: "wizard" | "customer";
  };
  token: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async (data: {
    email: string;
    password: string;
    username?: string;
    name?: string;
    role: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post<AuthResponse>("/api/auth/register", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setSuccess(res.data.message);
      return res.data.user;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => { 
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post<AuthResponse>("/api/auth/login", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setSuccess(res.data.message);
      return res.data.user;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, register, login };
};

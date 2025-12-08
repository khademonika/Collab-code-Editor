
import React, { use, useState } from "react";
import { Mail, Lock, Code, User } from "lucide-react";
import axios from "axios";
import UserNotExist from "../components/UserNotExist";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import InputCompo from "../components/InputCompo";
const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState(false);
  const { login, isLogin, setIsLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = !isLogin ? `${API}/api/auth/login` : `${API}/api/auth/signup`;

      const { data } = await axios.post(url, user);

      login(data.user, data.token);
toast("Login successfully")

      localStorage.setItem("token", data.token);
      window.location.href = "/";

    } catch (error) {
      setMessage(true);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    style={{ background: "var(--bg)", color: "var(--text)" }}
  >
    {/* Blobs */}
    <div className="absolute inset-0 z-[-1]">
      <div
        className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{ background: "var(--blob-blue)" }}
      ></div>
      <div
        className="absolute bottom-20 right-24 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{ background: "var(--blob-purple)" }}
      ></div>
    </div>

    {/* Card */}
    <div
      className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border shadow-2xl animate-fadeInUp"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500">
          <Code size={30} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold  mt-3" style={{ color: "var(--text)" }}>
          {isLogin ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--subtext)" }}>
          {isLogin ? "Join the collaboration" : "Login to continue"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        {isLogin && (
          <div className="relative group">
            <Mail className="absolute left-3 mr-5 top-3 text-gray-400 " size={18} />
          
            <InputCompo value={user.email} fun={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email"/>
          </div>
        )}

        {/* Username */}
        <div className="relative group">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
        
            <InputCompo value={user.username} fun={(e)=>setUser({ ...user, username: e.target.value })} placeholder="Username"/>

        </div>

        {/* Password */}
        <div className="relative group">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <InputCompo value={user.password} fun={(e)=>setUser({ ...user, password: e.target.value })} placeholder="Password"/>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-[1.02] transition-all"
          style={{
            boxShadow: "0 4px 15px var(--btn-shadow)",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : isLogin ? "Sign Up" : "Login"}
        </button>
      </form>

      {/* Switch */}
      <p className="mt-6 text-center" style={{ color: "var(--subtext)" }}>
        {isLogin ? "Already have an account?" : "Don't have an account?"}
        <button
          className="ml-1 hover:underline text-cyan-400"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </p>
    </div>

    {message && <UserNotExist onClose={() => setMessage(false)} />}
  </div>
);

};

export default LoginPage;


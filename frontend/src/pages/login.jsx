import React, { useState } from 'react';
import { Mail, Lock, Code, Sun, Moon } from 'lucide-react'; // Minimal icons library
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(false)
    const {isDark} = useTheme()

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      
      {/* Dark/Light Mode Toggle (Top Right) */}
      {/* <div className="absolute top-4 right-4 flex items-center space-x-2 text-white">
        <Sun size={20} className="text-yellow-400" />
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round bg-gray-700 hover:bg-gray-600 transition duration-300"></span>
        </label>
        <Moon size={20} className="text-gray-400" />
      </div> */}

      {/* Main Glassmorphism Login Card */}
      <div className="glass-card w-full max-w-md p-8 rounded-xl transition-all duration-500 hover:shadow-2xl">
        
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <Code size={40} className="text-violet-400 mb-2" /> 
          <h1 className="text-3xl font-bold text-white mb-1">Welcome {!isLogin && "Back"} to CodeHub</h1>
         {!isLogin &&  <p className="text-sm text-gray-400">Sign in to continue collaborating</p>}
        </div>

        {/* --- Form Fields --- */}
        <form className="space-y-6">
          
          {/* Email Input */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg border border-gray-700/50 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg border border-gray-700/50 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition duration-300"
              required
            />
          </div>
          {isLogin
          &&
           <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="Confirm password"
              placeholder="Confirm Password"
              className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg border border-gray-700/50 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition duration-300"
              required
            />
          </div>}

          {/* Forgot Password Link */}
          {!isLogin &&
          <div className="text-right text-sm">
            <a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition duration-300"
            >
              Forgot password?
            </a>
          </div>}

          {/* Primary Login Button (Neon Gradient) */}
          <button
            type="submit"
            className="neon-button w-full py-3 rounded-lg font-semibold text-lg text-white 
                       bg-gradient-to-r from-cyan-500 to-violet-600 
                       shadow-lg hover:shadow-cyan-500/50 transition duration-300"
          >
             {isLogin?"Sign up" : "Login"}
          </button>
        </form>

        {/* --- Footer / Sign Up Link --- */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account? 
          <a 
         
            className={`"text-violet-400 font-medium ml-1 hover:text-cyan-300 transition duration-300"`}
          >
            <button onClick={()=>setIsLogin(!isLogin)}>
                {isLogin?"Login":"Signup"}
            </button>
          </a>
        </p>
      </div>
      
      {/* Subtle Background Graphic/Illustration (Optional: Can be done with CSS or an SVG, here we simulate the feel) */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        {/* Simulates a blurred, abstract code/data pattern */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default LoginPage;
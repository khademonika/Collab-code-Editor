

// import React, { useState } from "react";
// import { Mail, Lock, Code } from "lucide-react";
// import axios from "axios";
// import UserNotExist from "../components/UserNotExist";
// import { useAuth } from "../context/AuthContext";

// const LoginPage = () => {
//   const [user, setUser] = useState({ email: "", password: "" , username:""});
//   const [message, setMessage] = useState(false)
//   const { login, logout,setIsLogin,isLogin } = useAuth()

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//  try {
//   const url = !isLogin ? "/api/auth/login" : "/api/auth/signup";

//   // POST request with user data
//   const { data } = await axios.post(url, user);
//   // Update global login state
//   login(data.user, data.token);
//   // Save token AFTER getting response
//   localStorage.setItem("token", data.token);



//   // Redirect user
//   window.location.href = "/";

// } catch (error) {
//   console.log(error.response?.data?.message || "Something went wrong");
//   setMessage(true);
// }

//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <div className="glass-card w-full max-w-md p-8 rounded-xl">

//         <div className="flex flex-col items-center mb-8">
//           <Code size={40} className="text-violet-400 mb-2" />
//           <h1 className="text-3xl font-bold text-white">
//             {isLogin ? "Create an account" : "Welcome Back"}
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//          {
//           isLogin&& <div>
//                <Mail
//               size={20}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={user.email}
//               onChange={(e) =>
//                 setUser({ ...user, email: e.target.value })
//               }
//               required
//               className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg"
//             />
//           </div>
//          }
//           </div>
//   <div className="relative">
//             <Mail
//               size={20}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Username"
//               value={user.username}
//               onChange={(e) =>
//                 setUser({ ...user, username: e.target.value })
//               }
//               required
//               className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg"
//             />
//           </div>
//           <div className="relative">
//             <Lock
//               size={20}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={user.password}
//               onChange={(e) =>
//                 setUser({ ...user, password: e.target.value })
//               }
//               required
//               className="w-full p-3 pl-10 bg-gray-800/60 text-white rounded-lg"
//             />
//           </div>

//           <button
//             type="submit"
//             className="neon-button w-full py-3 rounded-lg cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-violet-600"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </form>
//         <p className="mt-8 text-center text-gray-400 text-sm">
//           {isLogin ? "Already have an account?" : "Don't have an account?"}
//           <button
//             className="text-violet-400 ml-1 cursor-pointer"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Login" : "Signup"}
//           </button>
//         </p>
//       </div>
//       {message && (<UserNotExist onClose={() => setMessage(false)} />)}

//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Mail, Lock, Code, User } from "lucide-react";
import axios from "axios";
import UserNotExist from "../components/UserNotExist";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState(false);
  const { login, isLogin, setIsLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = !isLogin ? "/api/auth/login" : "/api/auth/signup";

      const { data } = await axios.post(url, user);

      login(data.user, data.token);
      localStorage.setItem("token", data.token);

      window.location.href = "/";
    } catch (error) {
      setMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-fadeInUp">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500">
            <Code size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">
            {isLogin ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            {isLogin ? "Join the collaboration" : "Login to continue"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email (only in signup) */}
          {isLogin && (
            <div className="relative group">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="Email"
              />
            </div>
          )}

          {/* Username */}
          <div className="relative group">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Username"
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:border-violet-400 focus:ring-2 focus:ring-violet-500 transition-all"
              placeholder="Password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch Login/Signup */}
        <p className="mt-6 text-center text-gray-300">
          {isLogin ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-cyan-400 ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </p>
      </div>

      {/* Error Popup */}
      {message && <UserNotExist onClose={() => setMessage(false)} />}
    </div>
  );
};

export default LoginPage;


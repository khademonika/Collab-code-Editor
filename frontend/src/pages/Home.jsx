import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Users,
  GitBranch,
  MessageSquare,
  ChevronRight,
  Check,
  ArrowRight,
  Zap,
  Lock,
  RefreshCw,
  Play,
  Quote,
  Shield,
  Cpu,
  Wifi,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Home() {
   
const {isDark} = useTheme()

     
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
 
   <div >
       <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Illustration */}
        <div className="relative">
          <svg viewBox="0 0 600 600" className="w-full h-auto">
            {/* Code Editor Window */}
            <rect x="150" y="140" width="300" height="200" rx="12" fill={isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
            
            {/* Window Header */}
            <rect x="150" y="140" width="300" height="30" rx="12" fill={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} />
            <circle cx="170" cy="155" r="4" fill={isDark ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'} />
            <circle cx="185" cy="155" r="4" fill={isDark ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'} />
            <circle cx="200" cy="155" r="4" fill={isDark ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'} />
            
            {/* Code Lines */}
            <rect x="170" y="185" width="120" height="8" rx="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} opacity="0.8" />
            <rect x="170" y="205" width="180" height="8" rx="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} opacity="0.6" />
            <rect x="170" y="225" width="140" height="8" rx="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} opacity="0.7" />
            <rect x="170" y="245" width="160" height="8" rx="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} opacity="0.5" />
            <rect x="170" y="265" width="100" height="8" rx="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} opacity="0.8" />
            
            {/* Connection Lines */}
            <path d="M 300 120 Q 320 100 350 110" stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" fill="none" opacity="0.6" />
            <circle cx="350" cy="110" r="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            <path d="M 300 160 Q 360 150 380 190" stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" fill="none" opacity="0.6" />
            <circle cx="380" cy="190" r="4" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            {/* People Avatars */}
            {/* Person 1 - Top Left */}
            <circle cx="100" cy="250" r="35" fill={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
            <circle cx="100" cy="240" r="12" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            <path d="M 75 270 Q 100 255 125 270" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            {/* Laptop 1 */}
            <rect x="60" y="290" width="80" height="50" rx="4" fill={isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" transform="rotate(-15 100 315)" />
            
            {/* Person 2 - Top Right */}
            <circle cx="500" cy="250" r="35" fill={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
            <circle cx="500" cy="240" r="12" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            <path d="M 475 270 Q 500 255 525 270" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            {/* Laptop 2 */}
            <rect x="460" y="290" width="80" height="50" rx="4" fill={isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" transform="rotate(15 500 315)" />
            
            {/* Person 3 - Bottom Left */}
            <circle cx="150" cy="450" r="35" fill={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
            <circle cx="150" cy="440" r="12" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            <path d="M 125 470 Q 150 455 175 470" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            {/* Person 4 - Bottom Right */}
            <circle cx="450" cy="450" r="35" fill={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
            <circle cx="450" cy="440" r="12" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            <path d="M 425 470 Q 450 455 475 470" fill={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} />
            
            {/* Table */}
            <ellipse cx="300" cy="500" rx="200" ry="20" fill={isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} stroke={isDark ? 'rgb(59, 130, 246)' : 'rgb(96, 165, 250)'} strokeWidth="2" />
          </svg>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          <h1 className={`text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Collaborate.<br />
            Code. Sync.
          </h1>
          
          <p className={`text-xl ${isDark ? 'text-blue-100' : 'text-gray-700'}`}>
            Real-time code collaboration, shared environments, and instant synchronization.
          </p>
          <Link to='/login'>
          <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
           Login
            <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button></Link>
        </div>
      </div>
   </div>

      {/* Main Content */}
   
    </div>

  );
}
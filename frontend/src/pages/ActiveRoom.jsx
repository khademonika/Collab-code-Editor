import React, { useState } from 'react';
import { Home, Grid, Users, Settings } from 'lucide-react';

export default function ActiveRoom() {
  const [activeNav, setActiveNav] = useState('rooms');
  const [darkMode, setDarkMode] = useState(false);

  const rooms = [
    { name: 'Project Hermes', participants: 5 },
    { name: 'Apollo-13 RDD', participants: 3 },
    { name: 'Backend Refactor', participants: 8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-cyan-300 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-gray-900 text-white p-6 flex flex-col">
          <div className="mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">{'</>'}</span>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveNav('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === 'projects' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <Home size={20} />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveNav('rooms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === 'rooms' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <Grid size={20} />
              <span>Rooms</span>
            </button>

            <button
              onClick={() => setActiveNav('team')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === 'team' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <Users size={20} />
              <span>Team</span>
            </button>

            <button
              onClick={() => setActiveNav('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === 'settings' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-12 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Active Coding Rooms</h1>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{room.name}</h3>
                  <p className="text-gray-600 mb-6">{room.participants} Participants</p>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                    Join Room
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
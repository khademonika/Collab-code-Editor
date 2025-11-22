import React from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <nav className={`flex items-center justify-between px-8 py-6 max-w-7xl mx-auto`}>
      
      {/* Left Links */}
      <div className="flex items-center gap-8">
        <p className={`text-lg font-medium transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
          <Link to="/">Home</Link>
        </p>

        <Link to='/about'>
          <button className={`text-lg font-medium transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
            About us
          </button>
        </Link>

        <Link to='/login'>
          <button className={`text-lg font-medium transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
            Login
          </button>
        </Link>
        
        <Link to='/createRoom'>
          <button className={`text-lg font-medium transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
            Create 
          </button>
        </Link>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`relative w-16 h-8 rounded-full transition-colors duration-300 
          ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 
            ${isDark ? 'translate-x-8' : 'translate-x-0'}`}
        />
      </button>

    </nav>
  )
}

export default Navbar;

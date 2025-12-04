
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor, ArrowLeft } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [themeOption, setThemeOption] = useState(isDark ? 'dark' : 'light');
  const { fontSize, setFontSize, wordWrap, setWordWrap, lineNumbers, setLineNumbers } = useSettings();
  const handleThemeChange = (option) => {
    setThemeOption(option);
    if (option === 'light') toggleTheme(false);
    if (option === 'dark') toggleTheme(true);
  };
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="min-h-screen join pt-24 pb-24 px-6 bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-10">
        <button onClick={() => navigate(-1)} className="flex items-center rounded-2xl  gap-2 join card text-lg px-4 py-1 text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {/* Appearance */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Appearance</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">Customize how CollabIDE looks and feels.</p>

          <div className="flex gap-4">
            {['light', 'dark', ].map((option) => (
              <button
                key={option}
                onClick={() => handleThemeChange(option)}
              
                className="flex items-center gap-2 px-4 py-2 rounded-lg border
                ">
                {option === 'light' && <Sun className="w-5 h-5" />}
                {option === 'dark' && <Moon className="w-5 h-5" />}            
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Editor Preferences */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Editor Preferences</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">Configure your coding environment.</p>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Font Size: {fontSize}px</label>
              <input type="range" min="10" max="24" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full" />
            </div>

           
            <div className="flex items-center justify-between">
              <span>Word Wrap</span>
              <input type="checkbox" checked={wordWrap} onChange={() => setWordWrap(!wordWrap)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Show Line Numbers</span>
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} />
            </div>
          </div>
        </section>
        {/* Danger Zone */}
        <section className="mt-8 p-6 bg-red-900/20 border border-red-700 rounded-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-red-300 mb-4">These actions cannot be undone. Please be careful.</p>
          {/* <button className="px-4 py-2  bg-red-600 text-white rounded hover:bg-red-700">Delete Account</button> */}
          <button
            className="px-4 py-2  bg-red-600 text-white rounded hover:bg-red-700"
            onClick={async () => {
              const ok = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
              if (!ok) return;
              try {
                const res = await axios.delete('/api/auth/delete', { withCredentials: true });
                if (res?.data?.success) {
                  toast.success('Account deleted');
                  // perform logout/local cleanup and redirect
                  try { logout(); } catch (e) { /* fallback */ }
                  navigate('/');
                } else {
                  toast.error(res?.data?.message || 'Failed to delete account');
                }
              } catch (err) {
                console.error('delete account error', err);
                toast.error(err?.response?.data?.message || 'Failed to delete account');
              }
            }}
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
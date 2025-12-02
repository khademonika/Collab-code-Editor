// import React, { useState } from 'react';
// import { useTheme } from '../context/ThemeContext'; // assuming ThemeContext is set up

// export default function Settings() {
//   const { isDark, toggleTheme } = useTheme();

//   const [language, setLanguage] = useState('javascript');
//   const [fontSize, setFontSize] = useState(14);
//   const [tabSize, setTabSize] = useState(2);
//   const [lineNumbers, setLineNumbers] = useState(true);
//   const [autosave, setAutosave] = useState(false);

//   const handleSave = () => {
//     const settings = {
//       language,
//       fontSize,
//       tabSize,
//       lineNumbers,
//       autosave,
//       theme: isDark ? 'dark' : 'light'
//     };
//     localStorage.setItem('collabIDE-settings', JSON.stringify(settings));
//     alert('Settings saved!');
//   };

//   return (
//     <div className="min-h-screen pt-24 px-8 bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
//       <div className="max-w-3xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center">Editor Settings</h1>

//         {/* Language */}
//         <div>
//           <label className="block mb-2 font-medium">Default Language</label>
//           <select
//             value={language}
//             onChange={e => setLanguage(e.target.value)}
//             className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800"
//           >
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="cpp">C++</option>
//             <option value="java">Java</option>
//             <option value="html">HTML</option>
//           </select>
//         </div>

//         {/* Font Size */}
//         <div>
//           <label className="block mb-2 font-medium">Font Size: {fontSize}px</label>
//           <input
//             type="range"
//             min="10"
//             max="24"
//             value={fontSize}
//             onChange={e => setFontSize(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>

//         {/* Tab Size */}
//         <div>
//           <label className="block mb-2 font-medium">Tab Size</label>
//           <input
//             type="number"
//             min="2"
//             max="8"
//             value={tabSize}
//             onChange={e => setTabSize(Number(e.target.value))}
//             className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800"
//           />
//         </div>

//         {/* Line Numbers */}
//         <div className="flex items-center gap-4">
//           <label className="font-medium">Show Line Numbers</label>
//           <input
//             type="checkbox"
//             checked={lineNumbers}
//             onChange={() => setLineNumbers(!lineNumbers)}
//           />
//         </div>

//         {/* Autosave */}
//         <div className="flex items-center gap-4">
//           <label className="font-medium">Enable Autosave</label>
//           <input
//             type="checkbox"
//             checked={autosave}
//             onChange={() => setAutosave(!autosave)}
//           />
//         </div>

//         {/* Theme Toggle */}
//         <div className="flex items-center gap-4">
//           <label className="font-medium">Theme</label>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded bg-slate-200 dark:bg-slate-700"
//           >
//             {isDark ? '🌙 Dark' : '☀️ Light'}
//           </button>
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSave}
//           className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [themeOption, setThemeOption] = useState(isDark ? 'dark' : 'light');
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);

  const handleThemeChange = (option) => {
    setThemeOption(option);
    if (option === 'light') toggleTheme(false);
    if (option === 'dark') toggleTheme(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Appearance */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Appearance</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">Customize how CollabIDE looks and feels.</p>
          <div className="flex gap-4">
            {['light', 'dark', 'system'].map((option) => (
              <button
                key={option}
                onClick={() => handleThemeChange(option)}
                disabled={option === 'system'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  themeOption === option ? 'bg-slate-800 text-white border-cyan-500' : 'bg-slate-100 dark:bg-slate-800'
                } ${option === 'system' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {option === 'light' && <Sun className="w-5 h-5" />}
                {option === 'dark' && <Moon className="w-5 h-5" />}
                {option === 'system' && <Monitor className="w-5 h-5" />}
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

            <div>
              <label className="block font-medium mb-1">Tab Size: {tabSize} spaces</label>
              <input type="number" min="2" max="8" value={tabSize} onChange={(e) => setTabSize(+e.target.value)} className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" />
            </div>

            <div className="flex items-center justify-between">
              <span>Word Wrap</span>
              <input type="checkbox" checked={wordWrap} onChange={() => setWordWrap(!wordWrap)} />
            </div>

            <div className="flex items-center justify-between">
              <span>Auto Save</span>
              <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
            </div>

            <div className="flex items-center justify-between">
              <span>Show Line Numbers</span>
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} />
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Data Management</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Export Data</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Import Data</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Sync Settings</button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mt-8 p-6 bg-red-900/20 border border-red-700 rounded-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-red-300 mb-4">These actions cannot be undone. Please be careful.</p>
          <button className="px-4 py-2  bg-red-600 text-white rounded hover:bg-red-700">Delete Account</button>
        </section>
      </div>
    </div>
  );
}
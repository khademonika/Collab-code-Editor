import React, { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from '../context/ThemeContext';

// --- MOCK THEME CONTEXT (Mimicking shadcn/ui integration) ---

// const ThemeContext = createContext();

// const useTheme = () => useContext(ThemeContext);

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark'); // Defaulting to 'dark' for dev aesthetic

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const {theme} = useTheme()
// --- SHADCN/UI STYLE MIMIC COMPONENTS ---

// Card Component
const Card = ({ children, className = '' }) => (
  <div className={`
    bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 
    rounded-xl shadow-lg
    ${className}
  `}>
    {children}
  </div>
);

// Switch Component (Mimicking shadcn/ui Switch)
const Switch = ({ checked, onCheckedChange, id }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`
      peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 
      border-transparent transition-colors duration-200 ease-in-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
      ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
    `}
  >
    <span
      className={`
        pointer-events-none block h-5 w-5 transform rounded-full bg-white shadow-lg 
        ring-0 transition duration-200 ease-in-out
        ${checked ? 'translate-x-5' : 'translate-x-0'}
      `}
    />
  </button>
);

// Label Component
const Label = ({ children, htmlFor, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none text-gray-700 dark:text-gray-200 ${className}`}
  >
    {children}
  </label>
);

// Separator Component
const Separator = ({ className = '' }) => (
  <div className={`h-px w-full bg-gray-200 dark:bg-gray-800 ${className}`} />
);

// Select Component (Basic implementation mimicking the look)
const Select = ({ value, onValueChange, options, placeholder }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="
      h-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 
      bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100
      ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500
      appearance-none transition duration-150
    "
  >
    {placeholder && <option value="" disabled>{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// RadioGroup Component (Mimicking shadcn/ui RadioGroup)
const RadioGroup = ({ value, onValueChange, options }) => (
  <div className="flex space-x-4">
    {options.map((option) => (
      <Label key={option.value} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          value={option.value}
          checked={value === option.value}
          onChange={() => onValueChange(option.value)}
          className="
            h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 
            text-blue-600 focus:ring-blue-500 dark:ring-offset-gray-900
            bg-white dark:bg-gray-900 appearance-none 
            checked:border-[5px] checked:border-blue-600 dark:checked:border-blue-500
          "
        />
        <span>{option.label}</span>
      </Label>
    ))}
  </div>
);

// Setting Item Wrapper
const SettingItem = ({ title, description, control }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4">
    <div className="mb-2 sm:mb-0 sm:w-2/3">
      <h4 className="text-md font-medium text-foreground">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
    <div className="w-full sm:w-1/3 flex justify-start sm:justify-end">
      {control}
    </div>
  </div>
);


// --- MAIN SETTINGS CONTENT (Consumes the context) ---

const SettingsContent = () => {
  // Now safely consumes context as it will be rendered within ThemeProvider
  const { theme, toggleTheme } = useTheme();

  // State for settings
  const [defaultLanguage, setDefaultLanguage] = useState('JavaScript');
  const [editorSize, setEditorSize] = useState('Medium');

  const languageOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Java', label: 'Java' },
  ];

  const sizeOptions = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
  ];

  const handleSave = () => {
    const currentSettings = {
      theme,
      defaultLanguage,
      editorSize,
    };
    console.log('Saving Settings:', currentSettings);
    // NOTE: Cannot use window.alert/confirm in Canvas environment, replaced with a safer console log simulation.
    console.log('Settings saved successfully!');
  };

  return (
      <div className="min-h-screen  bg-gray-50 dark:bg-gray-950 transition-colors duration-300 p-4 sm:p-8 font-sans">
        
        {/* Centered Content Container */}
        <div className="max-w-3xl mx-auto space-y-8 mt-12">
          
          {/* Header */}
          <div className="pt-4 pb-2">
            <h1 className="text-3xl font-bold text-gray-950 dark:text-gray-50">
              Settings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Configure your personal workspace and application preferences.
            </p>
          </div>

          {/* Settings Card Wrapper */}
          <Card className="p-6 sm:p-8 ">

            {/* --- 1. Theme Toggle (Appearance) --- */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-50 mb-4">
                Appearance
              </h2>
              <SettingItem
                title="Appearance"
                description="Choose your preferred color theme for the interface."
                control={
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="theme-toggle" className="sr-only">Toggle Theme</Label>
                    <Switch
                      id="theme-toggle"
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                      {theme}
                    </span>
                  </div>
                }
              />
            </section>
            
            <Separator />

            {/* --- 2. Default Language --- */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-50 mb-4">
                Editor Defaults
              </h2>
              <SettingItem
                title="Default Language"
                description="Your preferred coding language for new rooms and projects."
                control={
                  <Select
                    value={defaultLanguage}
                    onValueChange={setDefaultLanguage}
                    options={languageOptions}
                    placeholder="Select a language"
                  />
                }
              />
            
              <Separator className="my-4" />

              {/* --- 3. Editor Default Size --- */}
              <SettingItem
                title="Editor Size"
                description="Choose the default size setting for the editor panel in new rooms."
                control={
                  <RadioGroup
                    value={editorSize}
                    onValueChange={setEditorSize}
                    options={sizeOptions}
                  />
                }
              />
            </section>
            
          </Card>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="
                w-full sm:w-auto px-8 py-3 text-lg font-semibold
                rounded-xl transition duration-200 ease-in-out
                bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900
                shadow-lg hover:shadow-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50
              "
            >
              Save Preferences
            </button>
          </div>

        </div>
      </div>
  );
};

// --- MAIN SETTINGS PAGE COMPONENT (The exported wrapper) ---


// To make this runnable in the Canvas environment, we export the main component wrapped in its provider.
export default SettingsContent;
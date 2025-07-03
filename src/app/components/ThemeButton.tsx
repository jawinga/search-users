"use client";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      <span
        className={`text-sm font-medium transition-colors ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        Light
      </span>

      <label className="relative inline-flex items-center cursor-pointer group">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <div className="relative w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 dark:peer-focus:ring-purple-800/50 rounded-full peer dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:duration-300 after:shadow-lg dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600 dark:peer-checked:from-blue-600 dark:peer-checked:to-purple-700 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/25"
                : "bg-gradient-to-r from-gray-200 to-gray-300"
            }`}
          ></div>
        </div>

        <div className="absolute left-2 top-2 text-xs transition-all duration-300">
          {theme === "light" ? "☀️" : "🌙"}
        </div>
      </label>

      <span
        className={`text-sm font-medium transition-colors ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        Dark
      </span>
    </div>
  );
};

export default ThemeToggle;

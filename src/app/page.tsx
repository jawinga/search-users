"use client";

import { useTheme } from "@/context/ThemeContext";
import Searchbar from "./components/Searchbar";
import ThemeToggle from "./components/ThemeButton";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-8">
            <h1
              className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${
                theme === "light"
                  ? "from-blue-600 to-purple-600"
                  : "from-blue-400 to-purple-400"
              } bg-clip-text text-transparent`}
            >
              GitHub Explorer
            </h1>
            <p
              className={`text-lg md:text-xl ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              } max-w-2xl mx-auto`}
            >
              Discover and explore GitHub users with our beautiful search
              interface
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="mb-6">
            <ThemeToggle />
          </div>

          {/* Search Section */}
          <div className="w-full max-w-4xl">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
}

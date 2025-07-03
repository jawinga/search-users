"use client";

import React from "react";
import type { User } from "../models/User";
import Profile from "./Profile";

const Searchbar = () => {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [users, setUsers] = React.useState<User[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim() === "") {
      setUsers([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${value}`
        );
        const data = await res.json();
        setUsers(data.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Form */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors duration-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="search"
            id="default-search"
            className="block w-full pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500/20 dark:focus:border-purple-500 transition-all duration-300 hover:shadow-xl group-focus-within:shadow-xl"
            placeholder="Search GitHub users..."
            value={search}
            onChange={handleSearch}
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {search && <div className="text-center"></div>}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : users?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <Profile key={user.id} user={user} />
            ))}
          </div>
        ) : search && !isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              `No users found for ${search}`
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Try searching with a different username
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Searchbar;

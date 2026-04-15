"use client";

import { TT } from "country-flag-icons/react/3x2";
import { Moon, Sun } from "lucide-react";
import * as motion from "motion/react-client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="w-full bg-white dark:bg-gray-800 rounded-md shadow flex justify-center transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-row max-w-5xl p-8 w-full items-center justify-between"
        >
          <div className="flex flex-row p-6 gap-4">
            <h1 className="text-5xl font-semibold text-gray-900 dark:text-white">
              TT Job Board{" "}
            </h1>
            <TT className="w-12 h-12" />
          </div>
          <button
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <Sun className="w-5 h-5 text-gray-800 dark:text-white" />
          </button>
        </motion.div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white dark:bg-gray-800 rounded-md shadow flex justify-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-row max-w-5xl p-6 w-full items-center justify-between"
      >
        <div className="flex flex-row gap-4">
          <h1 className="text-2xl md:text-5xl font-semibold text-gray-900 dark:text-white">
            TT Job Board{" "}
          </h1>
          <TT className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 hover:cursor-pointer rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </motion.div>
    </header>
  );
};

export default Header;

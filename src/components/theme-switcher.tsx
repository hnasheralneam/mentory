import React, { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";
const themes: Theme[] = ["light", "dark", "system"];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    // On mount, read the theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      const isDark =
        newTheme === "dark" ||
        (newTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);

      if (newTheme === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", newTheme);
      }
    };

    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  const SystemIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md  text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#222] transition-colors"
      aria-label={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
      } theme`}
    >
      {theme === "light" && <SunIcon />}
      {theme === "dark" && <MoonIcon />}
      {theme === "system" && <SystemIcon />}
    </button>
  );
}

export default ThemeSwitcher;
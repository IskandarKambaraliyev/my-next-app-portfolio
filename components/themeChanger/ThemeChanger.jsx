// components/ThemeChanger.js
import { useEffect, useState } from "react";

export default function ThemeChanger() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(
      savedTheme === "dark" || (savedTheme === null && prefersDarkMode)
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`themeChangeToggle${isDarkMode ? " checked" : ""}`}
      onClick={toggleTheme}
      title={isDarkMode ? "Turn off Dark mode" : "Turn on Dark mode"}
    >
      <div className="toggleLabel">
        <span className="toggleLabelBackground"></span>
      </div>
      <div className="background"></div>
    </div>
  );
}

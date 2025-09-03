import { createContext, useState, useEffect } from "react";
import { node } from "prop-types";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getTheme = () => {
    return localStorage.getItem("theme") || "light";
  };
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: node.isRequired,
};

export { ThemeContext, ThemeProvider };

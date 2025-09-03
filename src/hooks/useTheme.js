import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;

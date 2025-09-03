import { createContext, useState, useEffect } from "react";
import { node } from "prop-types";

const LangContext = createContext();

const LangProvider = ({ children }) => {
  const getLang = () => {
    return localStorage.getItem("lang") || "ID";
  };
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-lang", lang);
  }, [lang]);

  const toggleLang = () => {
    const newLang = lang === "ID" ? "ENG" : "ID";

    localStorage.setItem("lang", newLang);
    setLang(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

LangProvider.propTypes = {
  children: node.isRequired,
};

export { LangContext, LangProvider };

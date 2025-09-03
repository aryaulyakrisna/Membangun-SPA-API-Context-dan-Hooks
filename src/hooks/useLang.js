import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";

const useLang = () => {
  return useContext(LangContext);
}

export default useLang;
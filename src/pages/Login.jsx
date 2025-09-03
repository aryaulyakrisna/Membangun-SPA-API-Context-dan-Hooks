import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import useLang from "../hooks/useLang";

const Login = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.title = lang === "ID" ? "Masuk" : "Login";
  }, [lang]);

  return <LoginForm />;
};

export default Login;

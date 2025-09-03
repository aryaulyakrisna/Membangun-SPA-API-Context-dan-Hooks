import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import useLang from "../hooks/useLang";

const Register = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.title = lang === "ID" ? "Daftar" : "Register";
  }, [lang]);

  return <RegisterForm />;
};

export default Register;

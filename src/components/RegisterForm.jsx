import { useRef, useState } from "react";
import useLang from "../hooks/useLang";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../services/apiClient";
import Alert from "./Alert";

const schema = z.object({
  name: z.string().min(1, { message: "Name minimal has 1 character" }),
  email: z.email({ message: "Email must be a valid email address" }),
  password: z.string().min(8, { message: "Password minimal has 8 characters" }),
});

const RegisterForm = () => {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccces] = useState(false);

  const isID = lang === "ID";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const passwordRef = useRef(null);
  const togglePassword = () => {
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };

  const handleRegister = async (data) => {
    setLoading(true);

    const requestConfig = {
      method: "POST",
      data,
    };

    if (isValid) {
      try {
        const response = await apiClient.request("/register", requestConfig);
        if (response.status === 201) {
          setRegisterSuccces(true);
          console.log(requestConfig);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        reset();
      }
    } else {
      console.log(errors);
    }
  };

  
  return (
    <>
      <section className="p-8 border-neutral border-2 max-w-xl mx-auto">
        <h2 className="text-3xl max-md:text-xl font-semibold mb-4">
          {isID ? "Daftar" : "Register"}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <label className="input validator input-neutral w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              {...register("name")}
              required
              placeholder="Name"
              pattern="[A-Za-z][A-Za-z0-9\-\s]*"
              minLength="1"
              title="Only letters, numbers or dash"
            />
          </label>

          <label className="input validator input-neutral w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              required
            />
          </label>

          <label className="input validator input-neutral w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={togglePassword}
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("password")}
            />
          </label>

          <button type="submit" className="flex-1 btn btn-neutral p-4">
            {loading ? (
              <span className="loading loading-circle loading-lg"></span>
            ) : isID ? (
              "Daftar"
            ) : (
              "Register"
            )}
          </button>
        </form>
      </section>

      <Alert setDisplayed={setRegisterSuccces} displayed={registerSuccess} type={"success"} message={isID? "Sukses, akun Anda terdaftar" : "Your account has been registered"}/>
      <Alert setDisplayed={setError} displayed={error} type={"error"} message={isID? "Gagal membuat akun" : "Failed, cannot register your account"}/>
    </>
  );
};

export default RegisterForm;

import { useRef, useState } from "react";
import useLang from "../hooks/useLang";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { saveAccessToken } from "../utils/accessToken";

const schema = z.object({
  email: z.email({ message: "Email must be a valid email address" }),
  password: z.string().min(8),
});

const LoginForm = () => {
  const { isLoading, setAuth } = useAuth();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const { lang } = useLang();

  const isID = lang === "ID";

  const passwordRef = useRef(null);
  const togglePassword = () => {
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };

  const handleLogin = async (data) => {
    setLoading(true);

    const requestConfig = {
      method: "POST",
      data,
    };

    console.log(requestConfig);

    if (isValid) {
      try {
        const response = await apiClient.request("/login", requestConfig);
        if (response.status === 200) {
          saveAccessToken(response.data.data.accessToken);
          setAuth(true);

          if (location.pathname === "/login") {
            navigate("/");
          }
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
          {isID ? "Masuk" : "Login"}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="Email"
              required
              {...register("email")}
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
              ref={passwordRef}
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("password")}
            />
          </label>
          <button type="submit" className="flex-1 btn btn-neutral p-4">
            {isLoading || loading ? (
              <span className="loading loading-circle loading-lg"></span>
            ) : isID ? (
              "Masuk"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </section>

      <Alert displayed={error} type={"error"} setDisplayed={setError} message={isID? "Gagal masuk" : "Failed to sign in"}/>
    </>
  );
};

export default LoginForm;

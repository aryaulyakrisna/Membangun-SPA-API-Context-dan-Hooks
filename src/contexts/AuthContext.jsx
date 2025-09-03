import { createContext, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { getAccessToken } from "../utils/accessToken";
import { node } from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const requestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  const { resState, isLoading, error } = useData("/users/me", requestConfig);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(resState === 200);
  }, [resState]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: node.isRequired
}

export { AuthContext, AuthProvider };

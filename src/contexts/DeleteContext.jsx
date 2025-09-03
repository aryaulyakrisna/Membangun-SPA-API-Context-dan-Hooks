import { createContext, useState } from "react";
import { getAccessToken } from "../utils/accessToken";
import apiClient from "../services/apiClient";
import { node } from "prop-types";

const DeleteContext = createContext();

const DeleteProvider = ({ children }) => {
  const [displayed, setDisplayed] = useState(false);
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    const requestConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    try {
      await apiClient.request(`/notes/${note.id}`, requestConfig);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setDisplayed(false);
    }
  };

  return (
    <DeleteContext.Provider
      value={{
        displayed,
        setDisplayed,
        note,
        setNote,
        isLoading,
        error,
        handleDelete,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};

DeleteProvider.propTypes = {
  children: node.isRequired,
};

export { DeleteContext, DeleteProvider };

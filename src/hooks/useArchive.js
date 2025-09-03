import { useState } from "react";
import apiClient from "../services/apiClient";
import { getAccessToken } from "../utils/accessToken";

const useArchive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNotesStatus = async (id, isArchived) => {
    setIsLoading(true);
    const endpoint = isArchived ? "unarchive" : "archive";

    const requestConfig = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    try {
      await apiClient.request(`/notes/${id}/${endpoint}`, requestConfig);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleNotesStatus, isLoading, errorMessage, setErrorMessage };
};

export default useArchive;

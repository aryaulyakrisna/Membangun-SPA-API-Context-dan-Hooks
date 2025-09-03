import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const useData = (endpoint, requestConfig, deps) => {
  const [data, setData] = useState([]);
  const [resState, setResState] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      const controller = new AbortController();

      setIsLoading(true);

      apiClient
        .request({ url: endpoint, signal: controller.signal, ...requestConfig })
        .then((res) => {
          setData(res.data.data);
          setResState(res.status);
        })
        .catch((err) => {
          if (!err) setError(err.message);
        });

      setIsLoading(false);
      
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, setData, resState, isLoading, error}
};

export default useData;

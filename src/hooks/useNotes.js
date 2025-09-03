import useData from "./useData";
import { getAccessToken } from "../utils/accessToken";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useNotes = () => {
  const [deps, setDeps] = useState(false);
  const changeDeps = () => setDeps(!deps);
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || "";

  const requestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  const res = useData("/notes", requestConfig, [deps]);

  let filteredData = res.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (title) {
    filteredData = res.data.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
  }

  return { ...res, data: filteredData, changeDeps };
};

export default useNotes;

import useLang from "../hooks/useLang";
import parser from "html-react-parser";
import Alert from "./Alert";
import showFormattedDate from "../utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { getAccessToken } from "../utils/accessToken";
import useArchive from "../hooks/useArchive";

const SingleNoteCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const [note, setNote] = useState({});
  const [error, setError] = useState("");
  const { isLoading, errorMessage, setErrorMessage, handleNotesStatus } = useArchive();

  const [deps, setDeps] = useState(false);

  const changeDeps = () => {
    setDeps(!deps);
  };

  useEffect(() => {
    document.title = note.title || "";
  }, [note.title]);

  useEffect(() => {
    const fetchNote = async () => {
      const requestConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      };

      try {
        const { data } = await apiClient.request(
          `/notes/${params.id}`,
          requestConfig
        );

        setNote(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNote();

    return () => {
      setError("");
      setNote({});
    };
  }, [params.id, deps]);

  if (error)
    return (
      <div className="w-full h-[60vh] flex justify-center items-center font-bold text-6xl max-sm:text-4xl text-center">
        {error}
      </div>
    );

  const isID = lang === "ID";
  const isArchived = isID
    ? note.archived
      ? "Disarsipkan"
      : "Tidak Diarsipkan"
    : note.archived
    ? "Archived"
    : "Unarchived";

  return (
    <>
      <section className="p-8 border-neutral border-2">
        <h2 className="text-3xl max-md:text-xl font-semibold mb-3">
          {note.title}
        </h2>
        <p className="mb-3 font-light">{showFormattedDate(note.createdAt)}</p>
        <p className="mb-6 font-light">{isArchived}</p>

        <div>
          <div className="textarea textarea-neutral w-full mb-4">
            {note.body ? parser(note.body) : ""}
          </div>
          <div className="flex">
            <button
              type="button"
              className="flex-1 btn btn-neutral p-4"
              onClick={async () => {
                await handleNotesStatus(note.id, note.archived);
                changeDeps();
              }}
            >
              {isLoading ? (
                <span className="loading loading-circle loading-lg"></span>
              ) : isID ? (
                note.archived ? (
                  "Keluarkan"
                ) : (
                  "Arsipkan"
                )
              ) : note.archived ? (
                "Unarchive"
              ) : (
                "Archive"
              )}
            </button>
            <button
              type="button"
              className="flex-1 btn btn-error p-4"
              onClick={() => navigate(-1)}
            >
              {isID ? "Kembali" : "Back"}
            </button>
          </div>
        </div>
      </section>

      <Alert displayed={errorMessage} setDisplayed={setErrorMessage} type={"error"} />
    </>
  );
};

export default SingleNoteCard;

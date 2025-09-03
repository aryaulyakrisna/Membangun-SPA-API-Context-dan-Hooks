import RemainingLetter from "./RemainingLetter";
import useLang from "../hooks/useLang";
import { func } from "prop-types";
import { useRef, useState } from "react";
import apiClient from "../services/apiClient";
import { getAccessToken } from "../utils/accessToken";
import useTheme from "../hooks/useTheme";
import Alert from "./Alert";

const AddNoteForm = ({ changeDeps }) => {
  const { lang } = useLang();
  const isID = lang == "ID";

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const bodyRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = bodyRef.current.innerHTML;

    const requestConfig = {
      method: "POST",
      data: {
        title,
        body,
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    try {
      const res = await apiClient.request("/notes", requestConfig);
      console.log(res);
      if (res.status === 201) {
        changeDeps();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTitle("");
      bodyRef.current.innerHTML = "";
    }
  };

  return (
    <>
      <section className="p-8 border-neutral border-2">
        <h2 className="text-3xl max-md:text-xl font-semibold mb-3">
          {isID ? "Tambahkan Catatan" : "Add Notes"}
        </h2>
        <p className="mb-4 font-light">Tidak diarsipkan</p>

        <RemainingLetter remainingLetter={50 - title.length} />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 50))}
            className="input input-neutral w-full"
            placeholder={
              isID ? "Masukkan judul catatan..." : "Enter note's title"
            }
            name="title"
            required
          />
          <div
            ref={bodyRef}
            className={`textarea textarea-neutral w-full ${
              theme === "light"
                ? "empty:before:text-[#8F949A]"
                : "empty:before:text-[#848E9B]"
            }`}
            data-placeholder={
              isID ? "Masukkan isi catatan..." : "Enter note's body"
            }
            contentEditable
          />
          <button type="submit" className="flex-1 btn btn-neutral p-4">
            {loading ? (
              <span className="loading loading-circle loading-lg"></span>
            ) : isID ? (
              "Tambah"
            ) : (
              "Add"
            )}
          </button>
        </form>
      </section>
      <Alert displayed={error} type={"error"} setDisplayed={setError} message={isID? "Gagal menambahkan catatan" : "Failed to add note"}/>

    </>
  );
};

AddNoteForm.propTypes = {
  changeDeps: func.isRequired,
};

export default AddNoteForm;

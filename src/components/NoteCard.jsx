import { Link } from "react-router-dom";
import useLang from "../hooks/useLang";
import useDelete from "../hooks/useDelete";
import parser from "html-react-parser";
import showFormattedDate from "../utils/formatDate";
import Alert from "./Alert";
import useArchive from "../hooks/useArchive";
import { object, func } from "prop-types";

const NoteCard = ({ note, changeDeps }) => {
  const { lang } = useLang();
  const { isLoading, errorMessage, setErrorMessage, handleNotesStatus } = useArchive();
  const isID = lang === "ID";
  const { setDisplayed, setNote } = useDelete();

  return (
    <>
      <div className="border-2 border-neutral flex flex-col gap-2 justify-between">
        <div className="p-8">
          <h3 className="mb-2 font-semibold truncate">{note.title}</h3>
          <p className="mb-3 font-light">{showFormattedDate(note.createdAt)}</p>
          <div className="as-p max-h-80 overflow-auto">{parser(note.body)}</div>
        </div>
        <div className="flex border-t-2 border-neutral">
          <button
            className="btn btn-neutral flex-1 btn-card-neutral"
            onClick={async () => {
              await handleNotesStatus(note.id, note.archived);
              changeDeps();
            }}
          >
            {isLoading ? (
              <span className="loading loading-circle loading-lg"></span>
            ) : note.archived ? (
              isID ? (
                "Keluarkan"
              ) : (
                "Unarchive"
              )
            ) : isID ? (
              "Arsipkan"
            ) : (
              "Archive"
            )}
          </button>

          <Link
            className="btn btn-success flex-1 btn-card-success"
            to={`/edit/${note.id}`}
          >
            {isID ? "Lihat" : "Take a look"}
          </Link>

          <button
            className="btn btn-error flex-1 btn-card-error"
            onClick={() => {
              setDisplayed(true);
              setNote(note);
            }}
          >
            {isID ? "Hapus" : "Delete"}
          </button>
        </div>
      </div>

      <Alert displayed={errorMessage} type={"error"} setDisplayed={setErrorMessage} message={isID? "Gagal mengubah status" : "Failed to change status"}/>
    </>
  );
};

NoteCard.propTypes = {
  note: object.isRequired,
  changeDeps: func.isRequired,
};

export default NoteCard;

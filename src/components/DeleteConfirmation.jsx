import { useEffect } from "react";
import useDelete from "../hooks/useDelete";
import useLang from "../hooks/useLang";
import { func } from "prop-types";

const DeleteConfirmation = ({ changeDeps }) => {
  const { displayed, setDisplayed, note, handleDelete, isLoading } =
    useDelete();
  const { lang } = useLang();
  const isID = lang === "ID";

  useEffect(() => {
    console.log(displayed);
  }, [displayed]);

  if (!displayed) return "";

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-base-100 p-4 z-[900]">
      <div className="border-neutral border-2 w-full p-4 max-w-xl">
        <h2 className="font-semibold text-error mb-2">
          {isID ? "Hapus" : "Delete"}
        </h2>
        <h3 className="text-3xl max-md:text-xl font-semibold mb-8 truncate">
          {note.title}
        </h3>

        <div className="flex">
          <button
            className="p-4 flex-1 btn btn-error"
            onClick={() => setDisplayed(false)}
          >
            {isID ? "Batal" : "Cancel"}
          </button>
          <button
            className="p-4 flex-1 btn btn-neutral text-error"
            onClick={async () => {
              await handleDelete();
              changeDeps();
            }}
          >
            {isLoading ? (
              <span className="loading loading-circle loading-lg"></span>
            ) : isID ? (
              "Hapus"
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmation.propTypes = {
  changeDeps: func.isRequired,
};

export default DeleteConfirmation;

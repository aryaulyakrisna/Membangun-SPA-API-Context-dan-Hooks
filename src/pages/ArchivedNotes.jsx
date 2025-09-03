import { useEffect } from "react";
import AddNoteForm from "../components/AddNoteForm";
import ListOfNotes from "../components/ListOfNotes";
import useLang from "../hooks/useLang";
import useArchivedNotes from "../hooks/useArchivedNotes";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { DeleteProvider } from "../contexts/DeleteContext";

const ArchivedNotes = () => {
  const { lang } = useLang();
  const { data, setData, isLoading, error, changeDeps } = useArchivedNotes();

  useEffect(() => {
    document.title = lang === "ID" ? "Archive" : "Arsip";
  }, [lang]);

  return (
    <>
      <DeleteProvider>
        <ListOfNotes
          notes={data}
          isLoading={isLoading}
          error={error}
          changeDeps={changeDeps}
          setNotes={setData}
          isArchived={true}
        />
        <DeleteConfirmation changeDeps={changeDeps} />
      </DeleteProvider>
    </>
  );
};

export default ArchivedNotes;

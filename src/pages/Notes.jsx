import AddNoteForm from "../components/AddNoteForm";
import ListOfNotes from "../components/ListOfNotes";
import { useEffect } from "react";
import useLang from "../hooks/useLang";
import useNotes from "../hooks/useNotes";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { DeleteProvider } from "../contexts/DeleteContext";

const Notes = () => {
  const { lang } = useLang();
  const { data, setData, isLoading, error, changeDeps } = useNotes();

  useEffect(() => {
    document.title = lang === "ID" ? "Catatan" : "Notes";
  }, [lang]);

  return (
    <>
      <DeleteProvider>
        <AddNoteForm changeDeps={changeDeps} />
        <ListOfNotes
          notes={data}
          isLoading={isLoading}
          error={error}
          changeDeps={changeDeps}
          setNotes={setData}
        />
        <DeleteConfirmation changeDeps={changeDeps} />
      </DeleteProvider>
    </>
  );
};

export default Notes;

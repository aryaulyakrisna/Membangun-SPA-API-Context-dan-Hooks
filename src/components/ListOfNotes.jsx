import SearchNotes from "./SearchNotes";
import CardsContainer from "./CardsContainer";
import useLang from "../hooks/useLang";
import NoteCard from "./NoteCard";
import { arrayOf, object, bool, func } from "prop-types";

const ListOfNotes = ({
  notes,
  isLoading,
  error,
  changeDeps,
  isArchived = false,
}) => {
  const { lang } = useLang();

  const cardNodes = (
    <CardsContainer>
      {notes?.map((note) => (
        <NoteCard note={note} key={note.id} changeDeps={changeDeps} />
      ))}
    </CardsContainer>
  );

  return (
    <section className="mt-8">
      <h2 className="text-3xl max-md:text-xl open-sans-semibold mb-4">
        {!isArchived
          ? lang === "ID"
            ? "Catatan"
            : "Notes"
          : lang === "ID"
          ? "Arsip"
          : "Archive"}
      </h2>

      <SearchNotes changeDeps={changeDeps} isArchiveList={isArchived} />

      {!isLoading &&
        error &&
        (lang === "ID"
          ? "Sedang ada masalah, tidak bisa menemukan catatan"
          : "We have some trouble, can't found notes")}
      {isLoading ? (
        <span className="loading loading-circle loading-xl"></span>
      ) : (
        cardNodes
      )}
      
    </section>
  );
};

ListOfNotes.propTypes = {
  notes: arrayOf(object),
  isArchived: bool,
  isLoading: bool.isRequired,
  error: bool.isRequired,
  changeDeps: func.isRequired,
};

export default ListOfNotes;

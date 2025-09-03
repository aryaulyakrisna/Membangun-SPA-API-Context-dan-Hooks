import { useNavigate, useSearchParams } from "react-router-dom";
import useLang from "../hooks/useLang";
import { useRef } from "react";
import { func, bool } from "prop-types";

const SearchNotes = ({ changeDeps, isArchiveList = false }) => {
  const { lang } = useLang();
  const [searchParams] = useSearchParams();
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(
      `${isArchiveList ? "/archive" : ""}/search?title=${
        titleRef.current.value
      }`,
      { replace: true }
    );
    await changeDeps();
  };

  return (
    <form className="mb-4 flex gap-2" onSubmit={handleSearch}>
      <label className="input w-full input-neutral">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          ref={titleRef}
          defaultValue={searchParams.get("title") || ""}
          placeholder={
            lang === "ID"
              ? "Cari note Anda disini..."
              : "Find your notes here..."
          }
        />
      </label>
      <button type="submit" className="btn btn-neutral">
        {lang === "ID" ? "Cari" : "Search"}
      </button>
    </form>
  );
};

SearchNotes.propTypes = {
  changeDeps: func.isRequired,
  isArchiveList: bool,
};

export default SearchNotes;

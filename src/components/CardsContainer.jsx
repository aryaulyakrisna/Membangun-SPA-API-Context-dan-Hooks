import useLang from "../hooks/useLang";
import { node } from "prop-types";

const CardsContainer = ({ children }) => {
  const { lang } = useLang();
  return (
    <div
      className={`${
        children?.length &&
        "grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
      } gap-4`}
    >
      {children?.length ? (
        children
      ) : (
        <p className="w-full text-center">
          {lang === "ID"
            ? "Tidak ada catatan yang bisa ditampilkan"
            : "No notes can be found"}
        </p>
      )}
    </div>
  );
};

CardsContainer.propTypes = {
  children: node.isRequired,
};

export default CardsContainer;

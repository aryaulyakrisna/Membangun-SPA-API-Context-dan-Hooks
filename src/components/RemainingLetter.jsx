import useLang from "../hooks/useLang";
import { string } from "prop-types";

const RemainingLetter = ({ remainingLetter }) => {
  const { lang } = useLang();

  return (
    <p className="text-end mb-2">
      {lang === "ID" ? "Sisa karakter" : "Remaining character"}:{" "}
      {remainingLetter}
    </p>
  );
};

RemainingLetter.propTypes = {
  remainingLetter: string.isRequired,
};

export default RemainingLetter;

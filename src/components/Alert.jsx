import useLang from "../hooks/useLang";
import { string, bool, func, oneOf } from "prop-types";

const Alert = ({ displayed = false, setDisplayed, type, message }) => {
  const { lang } = useLang();
  const isID = lang === "ID";

  if (!displayed) return null;

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-base-100 p-4 z-[910]">
      <div className={`border-neutral border-2 w-full p-4 max-w-xl`}>
        <h2 className={`font-semibold text-${type} mb-2`}>{type.slice(0, 1).toUpperCase() + type.slice(1)}</h2>
        <p className="text-sm font-semibold mb-8 truncate">
          {message}
        </p>

        <div className="flex justify-end">
          <button
            className={`p-4 flex-1 btn btn-${type}`}
            onClick={() => setDisplayed(false)}
          >
            {isID ? "Ok" : "Oke"}
          </button>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  displayed: bool,
  setDisplayed: func.isRequired,
  type: oneOf(["success, error"]).isRequired,
  message: string
};

export default Alert;

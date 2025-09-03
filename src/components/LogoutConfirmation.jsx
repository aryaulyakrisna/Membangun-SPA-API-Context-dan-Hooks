import useLang from "../hooks/useLang";
import { bool, func } from "prop-types";

const LogoutConfirmation = ({ displayed, clickCancel }) => {
  const { lang } = useLang();
  const isID = lang === "ID";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    location.pathname = "/login";
  };

  if (!displayed) return "";

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-base-100 p-4 z-[900]">
      <div className="border-neutral border-2 w-full p-4 max-w-xl">
        <h2 className="font-semibold text-error mb-2">
          {isID ? "Keluar" : "Logout"}
        </h2>
        <h3 className="text-xl max-md:text-xl font-semibold mb-8 truncate">
          {isID ? "Anda yakin untuk keluar?" : "Do you want to exit?"}
        </h3>

        <div className="flex">
          <button className="p-4 flex-1 btn btn-error" onClick={clickCancel}>
            {isID ? "Batal" : "Cancel"}
          </button>
          <button
            className="p-4 flex-1 btn btn-neutral text-error"
            onClick={handleLogout}
          >
            {isID ? "Ya" : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

LogoutConfirmation.propTypes = {
  displayed: bool.isRequired,
  clickCancel: func.isRequired,
};

export default LogoutConfirmation;

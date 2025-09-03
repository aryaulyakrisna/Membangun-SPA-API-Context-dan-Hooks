import { LuNotebookPen, LuLanguages, LuMenu } from "react-icons/lu";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useLang from "../hooks/useLang";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import LogoutConfirmation from "./LogoutConfirmation";

const Header = () => {
  const [displayLogout, setDisplayLogout] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const { auth } = useAuth();
  const isID = lang === "ID";

  const disabledPath = ["/login", "/register"];
  const isHidden = !auth ? !auth : disabledPath.includes(location.pathname);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="fixed top-0 left-0 z-[1000] shadow-lg bg-neutral text-neutral-content w-full p-5 flex justify-between items-center gap-5">
          <div>
            <Link to={"/"} className="gap-2 items-center flex font-bold">
              <LuNotebookPen />
              <h1>NoteApp</h1>
            </Link>
          </div>
          <nav className="flex gap-5 items-center ">
            <div className={`flex-none ${auth && "hidden"}`}>
              <Link className="btn-link" to={"/login"}>
                {isID ? "Masuk" : "Login"}
              </Link>
            </div>
            <div className={`flex-none ${auth && "hidden"}`}>
              <Link className="btn-link" to={"/register"}>
                {isID ? "Daftar" : "Register"}
              </Link>
            </div>
            <div
              className="tooltip tooltip-left"
              data-tip={`Change to '${lang === "ID" ? "ENG" : "ID"}'`}
            >
              <button className="btn-icon" onClick={toggleLang}>
                <LuLanguages />
              </button>
            </div>
            <div className="tooltip tooltip-left" data-tip="Change the theme">
              <button className="btn-icon" onClick={toggleTheme}>
                {theme === "light" ? <RiMoonClearFill /> : <RiSunFill />}
              </button>
            </div>
            <div className={`flex-none ${isHidden && "hidden"}`}>
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn-icon"
              >
                <LuMenu />
              </label>
            </div>
          </nav>
        </header>
      </div>
      <nav className={`drawer-side ${isHidden && "hidden"}`}>
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className=" shadow bg-base-200 min-h-full w-full max-w-80 mt-16 p-5 flex flex-col gap-3">
          <Link to={"/"} className="btn-side">
            {isID ? "Catatan" : "Notes"}
          </Link>
          <Link to={"/archive"} className="btn-side">
            {isID ? "Arsip" : "Archive"}
          </Link>
          <a
            className="btn-side text-left text-error"
            onClick={() => setDisplayLogout(true)}
          >
            {isID ? "Keluar" : "Logout"}
          </a>
        </div>
      </nav>

      {displayLogout && (
        <LogoutConfirmation
          displayed={displayLogout}
          clickCancel={() => setDisplayLogout(false)}
        />
      )}
    </div>
  );
};

export default Header;

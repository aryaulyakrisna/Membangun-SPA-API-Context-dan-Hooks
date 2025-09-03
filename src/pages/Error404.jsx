import { useEffect } from "react";
import useLang from "../hooks/useLang";

const Error404 = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.title = lang === "ID" ? "Error 404" : "Kesalahan 404";
  }, [lang]);

  return (
    <div className="w-full h-[60vh] flex justify-center items-center font-bold text-6xl max-sm:text-4xl text-center">
     {lang === "ID"? "Opps, Halaman tidak ditemukan (404)" : "Opps, pages can't be found"}
    </div>
  );
};

export default Error404;

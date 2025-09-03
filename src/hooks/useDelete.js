import { useContext } from "react";
import { DeleteContext } from "../contexts/DeleteContext";

const useDelete = () => {
  return useContext(DeleteContext);
}

export default useDelete;
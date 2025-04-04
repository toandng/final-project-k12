import { useContext } from "react";
import { LoadingContext } from "../contexts/loadingContext";


const useLoading = () => useContext(LoadingContext);

export default useLoading;
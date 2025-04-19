import {  useContext } from "react";
import { ReduxContext } from "../contexts/ReduxContext";

function useStore() {
    const store = useContext(ReduxContext);
    return store;
    
}   
export default useStore;
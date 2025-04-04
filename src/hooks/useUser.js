import { useContext } from "react"
import { UserContext } from "../contexts/useContext";

export const useUser = () => {
    const userContext = useContext(UserContext);
    return  [userContext.user, userContext.setUser]; ;
}

import authServices from "../../services/authServices";
import { GET_CURRENT_USER, SET_CURRENT_USER } from "./constants"


export const getCurrentUser = () => {
    return async(dipatch) => {
        dipatch({
            type: GET_CURRENT_USER
        })
        try {
            const data = await authServices.getCurrentUser();
            dipatch(setCurrentUser(data.user))

        } catch (error) {
            console.log(error);
        }
    }
}
export const setCurrentUser = (payload) => ({
    type: SET_CURRENT_USER,
    payload
}) 
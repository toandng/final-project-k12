import { useStore } from "react-redux";

function useDispatch() {
    const store = useStore();

    return store.dispatch;
}
export default useDispatch;
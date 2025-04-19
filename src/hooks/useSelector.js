import { useEffect, useState } from "react";
import useStore from "./useStore";

function useSelector(selector) {
    const store = useStore();
    const [state , setState] = useState(() =>{
        return selector(store.getState())
    });
    
    useEffect(()=> {
        const remove = store.subscribe(() => {
            const newState = selector(store.getState())
            if (newState !== state) {
                setState(newState);
            }
        })
        return () => remove();
    },[store, selector, state])
    return selector(state);
}
export default useSelector;
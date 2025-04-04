import { useEffect,useState } from "react";

function useDebounce(value, delay = 800) {
    const [input, setInput] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(value);


        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value,delay])
    return input;
}
export default useDebounce;
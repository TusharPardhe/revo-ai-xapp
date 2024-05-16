import { SetStateAction, useEffect, useState } from "react";

export function useDebounce<T>(value: T, time: number) {
    const [state, setState] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState(value);
        }, time);

        return () => {
            clearTimeout(timeout);
        }
    },
        [value, time]);


    return state;
}

export function useMergedState<T>(initialState: T) {
    const [state, setState] = useState<T>(initialState);

    const setMergedState = (newState: SetStateAction<T>) => {
        setState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    return [state, setMergedState] as const;
}
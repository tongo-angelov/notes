import { useEffect, useState } from "react";

const getLocalData = (key: string, initial: any) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return initial;
};

export default function useStorage(key: string, initial: any) {
    const [data, setData] = useState(() => getLocalData(key, initial));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data]);

    return [data, setData];
}
import { useCallback, useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try{
            const res = await fetch(url);

            if(!res.ok) throw new Error("No refresh token")

            const data = await res.json();

            setData(data);
        }catch(error){
            return;
        }
        
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return data;
}
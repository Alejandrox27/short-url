import { useEffect, useState } from "react";

const useIfUserLogged = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

    const functionGetRefreshIfUserLogged = async() => {
        try{
            const res = await fetch("http://localhost:5000/api/v1/auth/refresh",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
        
            const data = await res.json();
            if (!data.error){
                setUser(true);
            }
        }catch(error){
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        functionGetRefreshIfUserLogged()
    }, [])

    return {loading, user, setUser}
};

export default useIfUserLogged;
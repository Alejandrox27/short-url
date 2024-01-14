import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    async function useFetch(){
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
        setLoading(false);
    }

    useEffect(() => {
        useFetch();
    }, []);

    if (loading){
        return;
    }
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
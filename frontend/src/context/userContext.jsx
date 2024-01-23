import { createContext, useContext, useEffect, useState } from "react";
import useIfUserLogged from "../hooks/useIfUserLogged";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const {loading, user, setUser} = useIfUserLogged()

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
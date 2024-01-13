import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const data = useFetch("http://localhost:5000/api/v1/auth/refresh");

    const [user, setUser] = useState(data ? true : false);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
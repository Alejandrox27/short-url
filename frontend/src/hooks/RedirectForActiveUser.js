import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";

export const useRedirectActiveUser = () => {
    const {user} = useUserContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(user){
            navigate("/dashboard");
        }
    }, []);
}
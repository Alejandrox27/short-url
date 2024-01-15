import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {state} = useLocation();
    const {id, longLinkUrl, nanoLink} = state;
    
    const [longLink, setLongLink] = useState(longLinkUrl);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            setLoading(true);
            let res = await fetch("http://localhost:5000/api/v1/auth/refresh",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let data = await res.json();
            if (data.error){
                setError(data.error.msg);
            }

            const token = data.token;

            res = await fetch(`http://localhost:5000/api/v1/links/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    longLink
                }),
                credentials: "include"
            });

            data = await res.json();
            if (data.error || data.errors){
                setError(data.errors[0].msg);
                return
            };

            res = await fetch("http://localhost:5000/api/v1/links", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                credentials: "include"
            });

            if (!res.ok){
                setError("error, try again")
                return;
            }

            const {links} = await res.json();
            localStorage.setItem("ulinks", JSON.stringify(links));
            
            navigate("/dashboard");

        }catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="dashboard-great">
            <div className="dashboard-body">
                <h1 className="dashboard-title">LongLink</h1>
                <h2 className="welcome-dashboard">Edit</h2>
                <div className="form-link">
                    <form onSubmit={handleSubmit}>
                        <input 
                        type="text"
                        placeholder="longlink"
                        name="longLink"
                        id="longlink"
                        autoComplete="off"
                        className="input-add-longlink"
                        onChange={(e) => {
                            setLongLink(e.target.value)
                        }}
                        value={longLink}
                        />
                        <div className="add-button-and-loading">
                            <button type="submit" className="button-add-link">Edit</button>
                            {
                                loading && <CircularProgress />
                            }
                            {
                                error && <p className="text-danger ms-3">{error}</p>
                            }
                        </div>
                    </form>
                </div>
                <ul className="links-list">
                    <div className="link-card">
                        <div className="body-link">
                            <h2 className="longlink-url">{longLinkUrl}</h2>
                            <a href={`http://127.0.0.1:5000/goto/${nanoLink}`}>http://127.0.0.1:5000/goto/{nanoLink}</a>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
};

export default Edit;
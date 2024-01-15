//import {useLocation} from 'react-router-dom';

import LinkCard from "../components/LinkCard";
import "../linkCard.css";
import "../dashboard.css"
import { useState } from "react";

const Dashboard = () => {

    const [longlink, setLonglink] = useState("");

    const links = JSON.parse(localStorage.getItem("ulinks"));
    
    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="dashboard-great">
            <div className="dashboard-body">
                <h1 className="dashboard-title">DashBoard</h1>
                <h2 className="welcome-dashboard">Welcome</h2>
                <div className="form-link">
                    <form onSubmit={handleSubmit}>
                        <input 
                        type="text"
                        placeholder="longlink"
                        name="longlink"
                        id="longlink"
                        autoComplete="off"
                        className="input-add-longlink"
                        onChange={(e) => {
                            setLonglink(e.target.value)
                        }}
                        value={longlink}
                        />
                        <button type="submit" className="button-add-link">Add</button>
                    </form>
                </div>
                <ul className="links-list">
                    {
                        links.map((link, index) => {
                            return <LinkCard key={index} longLink={link.longLink} nanoLink={link.nanoLink} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default Dashboard;
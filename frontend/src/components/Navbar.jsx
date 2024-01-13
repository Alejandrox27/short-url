import { useUserContext } from "../context/userContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const {user, setUser} = useUserContext();

    const handleLogout = async () => {
        const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
            credentials: "include"
        });
        const data = await res.json();

        if(data.ok){
            localStorage.removeItem("ulinks")
            setUser(false);
        }

    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor : "#1a2c26"}}>
            <div className="container-fluid justify-content-between">
                <a className="navbar-brand logo-shorturl" href="#">Short URL</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link active" aria-current="page" to="/" id="home">Home</NavLink>
                        {
                            user && <NavLink className="nav-link" to="/dashboard" id="dashboard">Dashboard</NavLink>
                        }
                        <NavLink className="nav-link" to="/login" id="login">LogIn</NavLink>
                        <button onClick={handleLogout} className="nav-link text-start" id="logout">Logout</button>
                        <NavLink className="nav-link" to="/register" id="register">Register</NavLink>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
};

export default Navbar;
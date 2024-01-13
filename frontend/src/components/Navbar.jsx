import { useUserContext } from "../context/userContext";

const Navbar = () => {
    const {user} = useUserContext();

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
                        <a className="nav-link active" aria-current="page" href="" id="home">Home</a>
                        {
                            user && <a className="nav-link" href="/dashboard" id="dashboard">Dashboard</a>
                        }
                        <a className="nav-link" href="/login" id="login">LogIn</a>
                        <a className="nav-link" href="" id="logout">LogOut</a>
                        <a className="nav-link" href="" id="register">Register</a>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
};

export default Navbar;
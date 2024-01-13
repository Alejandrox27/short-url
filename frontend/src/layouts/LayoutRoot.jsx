import { Outlet } from "react-router-dom";

const LayoutRoot = () => {
    return(
        <>
        <nav>
            <ul>
                <li>Home</li>
                <li>Login</li>
                <li>Logout</li>
                <li>Register</li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
};

export default LayoutRoot;
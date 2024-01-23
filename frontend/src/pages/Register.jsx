import { useCallback, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useRedirectActiveUser } from "../hooks/RedirectForActiveUser";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const {setUser} = useUserContext();

    const [form, setForm] = useState({
        email: "martin@mail.com",
        password: "1234567",
        repassword: "1234567",
    });

    const [loading, setLoading] = useState(false);

    useCallback(useRedirectActiveUser(), [])

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);

            let res = await fetch("http://localhost:5000/api/v1/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
            credentials: "include"
        });

        let data = await res.json();

        if(!res.ok){
            Swal.fire({
                position: "center",
                icon: "warning",
                iconColor: "#F5E001",
                background: "#5E7A7C",
                color: "#FFF",
                title: data?.error || data?.errors[0].msg,
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const token = data.token;

        res = await fetch("http://localhost:5000/api/v1/links", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include"
        });

        if(!res.ok){
            data = await res.json();
            Swal.fire({
                position: "center",
                icon: "info",
                iconColor: "#00DEF6",
                background: "#5E7A7C",
                color: "#FFF",
                title: "Verify your account with the email to enter.",
                showConfirmButton: false,
                timer: 2500
                });
            return;
        }

        localStorage.setItem("ulinks", JSON.stringify([]))
        setUser(true);
        navigate("/dashboard")

        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="great-register">
            <div className="container body-register-container">
                
                <h1>Register</h1>

                <div className="container">
                    <form onSubmit={handleSubmit} action="http://localhost:5000/api/v1/auth/register" method="post" id="form">
                        <input 
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        id="email"
                        autoComplete="off"
                        value={form.email}
                        onChange={handleChange}
                        />
                        <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        />
                        <input 
                        type="password"
                        placeholder="Repeat password"
                        name="repassword"
                        id="repassword"
                        value={form.repassword}
                        onChange={handleChange}
                        />
                        <button type="submit" id="login-button">Register</button>
                        <div className="loading-register-container">
                            {
                                loading && <CircularProgress color="inherit" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
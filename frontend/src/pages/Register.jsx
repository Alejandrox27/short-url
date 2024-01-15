import { useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";

const Register = () => {
    const navigate = useNavigate();
    const {setUser} = useUserContext();

    const [form, setForm] = useState({
        email: "martin@mail.com",
        password: "1234567",
        repassword: "1234567",
    });

    const [loading, setLoading] = useState(false);

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

            const res = await fetch("http://localhost:5000/api/v1/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
            credentials: "include"
        });

        if(res.ok){
            setUser(true);
            localStorage.setItem("ulinks", JSON.stringify([]))
            navigate("/dashboard")
            return;
        }

        const data = await res.json();
        
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
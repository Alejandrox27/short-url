import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import { useRedirectActiveUser } from "../hooks/RedirectForActiveUser";
import reSendEmail from "../hooks/useResendEmail";

const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useUserContext(); 
    
    const [loading, setLoading] = useState(false);
    const [form , setForm] = useState({
        email: "john@gmail.com",
        password: "1234567",
    });


    useCallback(useRedirectActiveUser(), [])

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setLoading(true);
            let res = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
                credentials: "include"
            });

            let data = await res.json();
            if(data.errors || data.error){
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
                    title: "User not verified",
                    text: "Go to your email and verify your account",
                    icon: "warning",
                    iconColor: "#F5E001",
                    background: "#5E7A7C",
                    color: "#FFF",
                    showCancelButton: false,
                    confirmButtonColor: "#f59701",
                    confirmButtonText: "re-send email"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        //send new verify email
                        reSendEmail({form});

                      Swal.fire({
                        title: "New email sent",
                        text: "Go to your email and verify your account.",
                        icon: "success",
                        iconColor: "#F5E001",
                        background: "#5E7A7C",
                        color: "#FFF",
                        confirmButtonColor: "#f59701"
                      });
                    }
                  });
                return;
            }

            const {links} = await res.json();
            localStorage.setItem("ulinks", JSON.stringify(links));
            setUser(true);
            navigate('/dashboard');
            //navigate('/dashboard', { state: {links: links} });

        }catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    function handleChange(e){
        const {name, value} = e.target;
        
        setForm({
            ...form,
            [name]: value
        });
    }

    return (
        <div className="great">
            <div className="container body-login-container">
                
                <h1>LogIn</h1>

                <div className="container form-login-container">
                    <form onSubmit={handleSubmit} action="http://localhost:5000/api/v1/auth/login" method="post" id="form">
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
                        <button type="submit" id="login-button">Login</button>
                        <div className="loading-login-container">
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

export default Login;
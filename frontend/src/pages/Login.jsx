import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useUserContext(); 

    const [form , setForm] = useState({
        email: "john@gmail.com",
        password: "1234567",
    })

    async function handleSubmit(e) {
        e.preventDefault();

        //TODO: validations

        let res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            credentials: "include"
        });

        const {token} = await res.json();

        res = await fetch("http://localhost:5000/api/v1/links", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include"
        })

        const {links} = await res.json();
        localStorage.setItem("ulinks", JSON.stringify(links));
        setUser(true);
        navigate('/dashboard');
        //navigate('/dashboard', { state: {links: links} });
        
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
            <div className="container body-container">
                
                <h1>LogIn</h1>

                <div className="container">
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
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;
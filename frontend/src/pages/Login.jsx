import { useState } from "react";
import { useUserContext } from "../context/userContext";

const Login = () => {
    const {setUser} = useUserContext(); 

    const [form , setForm] = useState({
        email: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();

        //TODO: validations

        let res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        });

        const {token} = await res.json();

        res = await fetch("http://localhost:5000/api/v1/links", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })

        const data = await res.json();
        console.log(data);
        
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
                    <form onSubmit={handleSubmit} action="http://127.0.0.1:5000/api/v1/auth/login" method="post" id="form">
                        <input 
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onChange={handleChange}
                        />
                        <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
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
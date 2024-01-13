const Login = () => {
    return (
        <>
        <div class="container body-container">
            
            <h1>LogIn</h1>

            <div class="container">
                <form action="http://127.0.0.1:5000/api/v1/auth/login" method="post" id="form">
                    <input 
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    id="email"
                    autocomplete="off"
                    />
                    <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    />
                    <button type="submit" id="login-button">Login</button>
                </form>
            </div>

        </div>
        </>
    )
}

export default Login;
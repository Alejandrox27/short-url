function loaded(){
    const home = document.getElementById("home");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    const register = document.getElementById("register");

    home.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const resToken = await fetch("http://127.0.0.1:5000/api/v1/auth/refresh", {
                method: "GET",
                credentials: "include",
            });
    
            const { token } = await resToken.json();

            const response = await fetch(home.href, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`,
            },
            })

        } catch (error) {
            console.error('Error inesperado:', error);
        }
    })

    login.addEventListener("click", async (e) => {

    })

    logout.addEventListener("click", async (e) => {

    })

    register.addEventListener("click", async (e) => {

    })


}

window.addEventListener("load", loaded, false);
const logout = document.getElementById("logout");

logout.addEventListener("click", async() => {
    const res = await fetch("/api/v1/auth/logout", {
        method: "GET",
    });

    console.log(res);
})

document.addEventListener("DOMContentLoaded", async (e) => {
    try{

        const resToken = await fetch("/api/v1/auth/refresh", {
            method: "GET",
            credentials: "include",
        });

        const { token } = await resToken.json();

        const res = await fetch("/api/v1/auth/protected", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include"
        });

        console.log(res.ok, res.status);

        if(!res.ok) return;

        const data = await res.json();

        document.getElementById("app").textContent = "Email: " + data.email;

        console.log(data);
    }catch(error){
        console.log(error);
    }
})
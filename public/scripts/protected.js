document.addEventListener("DOMContentLoaded", async (e) => {
    try{
        const token = localStorage.getItem("token");
        const res = await fetch("/api/v1/auth/protected", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
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
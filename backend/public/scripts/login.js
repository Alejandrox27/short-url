function loaded(){
    const form = document.getElementById("form");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const [email, password] = [...data.values()];

        try{
            let res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: 'include'
            });

            const data = await res.json();
            
            if ("error" in data) throw new Error(data.error);
            if ("errors" in data) throw new Error(data.errors[0].msg);

            const resToken = await fetch("/api/v1/auth/refresh", {
                method: "GET",
                credentials: "include",
            });
    
            const { token } = await resToken.json();
    
            res = await fetch("http://127.0.0.1:5000/api/v1/links",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                color: "#1F4239",
                background: "#BBDBD6 url(/images/trees.png)",
                text: error.message,
              });
        }
    })
}

window.addEventListener("load", loaded, false);
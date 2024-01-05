function loaded(){
    const form = document.getElementById("form");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const [email, password] = [...data.values()];

        try{
            const res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();
            console.log(data);
        }catch(error){
            console.log(error);
        }
    })
}

window.addEventListener("load", loaded, false);
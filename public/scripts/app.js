const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try{
        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value, 
                password: password.value
            }),
        });
        if(!res.ok) return
            
        //const { token } = await res.json();
        
    }catch(error){
        console.log(error)
    }
})
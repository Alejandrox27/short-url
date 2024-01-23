const reSendEmail = async({form}) => {
    await fetch("http://localhost:5000/api/v1/auth/resendemail",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
        credentials: "include"
    });
};

export default reSendEmail;
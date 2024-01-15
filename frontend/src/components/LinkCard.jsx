const LinkCard = ({linkId, longLink, nanoLink, setError, setSuccess, setLoading}) => {

    const handleDelete = async(e) => {
        console.log(e.target.id)
        try{
            setLoading(true);
            let res = await fetch("http://localhost:5000/api/v1/auth/refresh",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let data = await res.json();
            if (data.error){
                setError(data.error.msg);
            }

            const token = data.token;

            res = await fetch(`http://localhost:5000/api/v1/links/${e.target.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                credentials: "include"
            });

            if(!res.ok){
                setError("URL not deleted");
                return;
            }

            res = await fetch("http://localhost:5000/api/v1/links",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                credentials: "include"
            });

            const {links} = await res.json();
            localStorage.setItem("ulinks", JSON.stringify(links));

            setSuccess("URL deleted correctly")
            
        }catch(error){
            setError("URL not deleted")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="link-card">
            <div className="body-link">
                <h2>{longLink}</h2>
                <a href={`http://127.0.0.1:5000/goto/${nanoLink}`}>http://127.0.0.1:5000/goto/{nanoLink}</a>
            </div>
            <div className="body-link-buttons">
                <button id={linkId} onClick={handleDelete} className="btn btn-danger">Delete</button>
                <button id={linkId} className="btn btn-warning">Edit</button>
                <button id={linkId} className="btn btn-info">Copy</button>
            </div>
        </div>
    )
};

export default LinkCard;
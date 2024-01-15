import Swal from "sweetalert2";

const LinkCard = ({linkId, longLink, nanoLink, setError, setSuccess, setLoading}) => {

    const handleDelete = async(e) => {
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
                <h2 className="longlink-url">{longLink}</h2>
                <a href={`http://127.0.0.1:5000/goto/${nanoLink}`}>http://127.0.0.1:5000/goto/{nanoLink}</a>
            </div>
            <div className="body-link-buttons">
                <button id={linkId} onClick={handleDelete} className="btn btn-danger">Delete</button>
                <button id={linkId} className="btn btn-warning">Edit</button>
                <button id={linkId} onClick={async () => {
                    try{
                        await navigator.clipboard.writeText(`http://127.0.0.1:5000/goto/${nanoLink}`);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            iconColor: "#F5E001",
                            background: "#5E7A7C",
                            color: "#FFF",
                            title: "shortURL copied to clipboard",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }catch(err){
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            iconColor: "#F5E001",
                            background: "#5E7A7C",
                            color: "#FFF",
                            title: "shortURL not copied to clipboard",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                }} className="btn btn-info">Copy</button>
            </div>
        </div>
    )
};

export default LinkCard;
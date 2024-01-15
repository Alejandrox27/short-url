const LinkCard = ({longLink, nanoLink}) => {
    return(
        <div className="link-card">
            <div className="body-link">
                <h2>{longLink}</h2>
                <a href={`http://127.0.0.1:5000/goto/${nanoLink}`} >http://127.0.0.1:5000/goto/{nanoLink}</a>
            </div>
            <div className="body-link-buttons">
                <button className="btn btn-danger">Delete</button>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-info">Copy</button>
            </div>
        </div>
    )
};

export default LinkCard;
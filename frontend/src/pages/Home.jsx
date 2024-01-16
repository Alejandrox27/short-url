import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faFacebook, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    return(
        <>
        <div className="home-body">
            <div className="container container-home">
                <h1>ShortURL's</h1> 
                <p>Hi, this is my shortURL program, it's a proyect fullstack made by AlejandroDev <br/>
                Thank you for using my program and if you want to contact me or <br/>
                you have a constructive criticism about my program, fell free to contact me on my social media<br/>
                </p>
                <div className="social-media">
                    <h2>social media</h2>
                    <div className="social-media-icons">
                        <a href="https://instagram.com/_alejandro_829" ><FontAwesomeIcon className="icon" icon={faInstagram} /></a>
                        <a href="https://www.facebook.com/didier.mejia.50746" ><FontAwesomeIcon className="icon" icon={faFacebook} /></a>
                        <a href="https://github.com/Alejandrox27" ><FontAwesomeIcon className="icon" icon={faGithub} /></a>
                        <a href="mailto:alej.mejia89@gmail.com" ><FontAwesomeIcon className="icon" icon={faEnvelope} /></a>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
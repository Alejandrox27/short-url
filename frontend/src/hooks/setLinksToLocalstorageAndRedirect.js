const useLinksToLocalStorageAndRedirect = ({setUser, links, navigate}) => {
    localStorage.setItem("ulinks", JSON.stringify(links));
    setUser(true);
    navigate('/dashboard');
}

export default useLinksToLocalStorageAndRedirect;
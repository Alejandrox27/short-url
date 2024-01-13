import {useLocation} from 'react-router-dom';

const Dashboard = () => {
    const data = useLocation();
    const links = data.state.links;
    console.log(links);

    return (
        <>
        <h1>DashBoard</h1>
        <h2>Welcome</h2>
        </>
    )
};

export default Dashboard;
//import {useLocation} from 'react-router-dom';

const Dashboard = () => {
    const links = localStorage.getItem("ulinks");
    console.log(links);

    return (
        <>
        <div className="dashboard-body">
            <h1>DashBoard</h1>
            <h2>Welcome</h2>
        </div>
        </>
    )
};

export default Dashboard;
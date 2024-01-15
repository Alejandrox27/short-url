import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../layouts/LayoutRoot";
import Home from "../pages/home";
import LayoutPrivate from "../layouts/LayoutPrivate";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Edit from "../pages/Edit";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutRoot />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/dashboard",
                element: <LayoutPrivate />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            },
            {
                path: "/edit",
                element: <LayoutPrivate />,
                children: [
                    {
                        index: true,
                        element: <Edit />
                    }
                ]
            },
        ]
    }
])
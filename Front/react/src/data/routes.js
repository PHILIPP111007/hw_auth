import { lazy } from "react"
var User = lazy(() => import("../pages/User/User"))
var Login = lazy(() => import("../pages/Login/Login"))
var Register = lazy(() => import("../pages/Register"))

export var PublicRoutes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login/",
        element: <Login />
    },
    {
        path: "/register/",
        element: <Register />
    },
]

export var PrivateRoutes = [
    {
        path: "/users/:username/",
        name: "User",
        element: <User />
    },
]
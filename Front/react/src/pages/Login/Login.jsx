import "./styles/Login.css"
import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext, UserContext } from "@data/context"
import { HttpMethod, CacheKeys } from "@data/enums"
import Fetch from "@API/Fetch"
import getToken from "@modules/getToken"
import Input from "@pages/components/UI/Input"

export default function Login() {

    var { setIsAuth } = useContext(AuthContext)
    var { user, setUser } = useContext(UserContext)
    var [loginForm, setLoginForm] = useState({ username: "", password: "" })
    var navigate = useNavigate()

    async function auth() {
        var token = getToken()
        var data = await Fetch({ action: "user/", method: HttpMethod.GET, token: token })

        if (data && !data.detail && data.username) {
            setUser({ ...user, ...data })
            setIsAuth(true)

            var path = `/users/${data.username}/`
            navigate(path)
        }
    }

    async function login(event) {
        event.preventDefault()
        var data = await Fetch({ action: "token/", method: HttpMethod.POST, body: loginForm, token: "" })

        if (data && data.token) {
            localStorage.setItem(CacheKeys.TOKEN, data.token)
            setIsAuth(true)
            auth()
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return (
        <div className="Login">
            <div className="LoginForm">
                <h2>Welcome to hw_auth!</h2>
                <form id="LoginForm" onSubmit={e => login(e)}>
                    <Input
                        value={loginForm.username}
                        onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                        placeholder="username"
                        type="text"
                        required
                    />
                    <br />
                    <Input
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="password"
                        type="password"
                        required
                    />
                    <br />
                    <Input type="submit" value="log in" />
                </form>
                <Link to="/register/" >Register</Link>
            </div>
        </div>
    )
}
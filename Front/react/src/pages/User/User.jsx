import "./styles/User.css"
import "../../styles/Posts.css"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "@data/context"
import { useSetUser } from "@hooks/useAuth"
import MainComponents from "@pages/components/MainComponents/MainComponents"

export default function User() {

    var { user, setUser } = useContext(UserContext)
    var params = useParams()
    var [userLocal, setUserLocal] = useState(user)

    useSetUser({ username: params.username, setUser: setUser, setUserLocal: setUserLocal })

    return (
        <div className="User">
            <MainComponents />

            <div className="UserCard">
                <div>@{userLocal.username}</div>
            </div>
        </div>
    )
}

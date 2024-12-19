import "./styles/User.css"
import "../../styles/Posts.css"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "@data/context"
import { useSetUser } from "@hooks/useAuth"
import { HttpMethod } from "@data/enums"
import rememberPage from "@modules/rememberPage"
import Fetch from "@API/Fetch"
import MainComponents from "@pages/components/MainComponents/MainComponents"

export default function User() {

    var { user, setUser } = useContext(UserContext)
    var params = useParams()
    var [userLocal, setUserLocal] = useState(user)
    var [mainSets, setMainSets] = useState({
        post: {
            btnFlag: false,
            changed: false,
            timestamp: "",
            user: {
                username: "",
                first_name: "",
                last_name: ""
            },
            content: "",
            postLen500: false
        },
        loading: true,
    })

    useEffect(() => {
        rememberPage("users")
    }, [params.username])

    useSetUser({ username: params.username, setUser: setUser, setUserLocal: setUserLocal })

    return (
        <div className="User">
            <MainComponents loading={mainSets.loading} />

            <div className="UserCard">
                <h3>{userLocal.first_name} {userLocal.last_name}</h3>
                <div>@{userLocal.username}</div>
            </div>
        </div>
    )
}

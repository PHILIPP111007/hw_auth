import { useEffect } from "react"
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import getToken from "@modules/getToken"

export function useAuth({ username, setIsAuth }) {
    var Func = useEffect(() => {
        var token = getToken()
        if (token === null) {
            setIsAuth(false)
        } else {
            setIsAuth(true)
        }
    }, [username])
    return Func
}

export function useSetUser({ username, setUser }) {
    var Func = useEffect(() => {
        Fetch({ action: `user/${username}/`, method: HttpMethod.GET })
            .then((data) => {
                setUser(data)
            })
    }, [username])
    return Func
}
import "./styles/SettingsBar.css"
import { useContext } from "react"
import { AuthContext } from "@data/context"
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import Button from "@pages/components/UI/Button"

export default function SettingsBar(props) {

    var { setIsAuth } = useContext(AuthContext)

    async function logout() {
        await Fetch({ action: "token/token/logout/", method: HttpMethod.POST })
            .then(() => {
                localStorage.clear()
                setIsAuth(false)
            })
    }

    return (
        <div className="SettingsBar" ref={props.setBarRef} >
            <Button onClick={() => logout()} >quit</Button>
        </div>
    )
}
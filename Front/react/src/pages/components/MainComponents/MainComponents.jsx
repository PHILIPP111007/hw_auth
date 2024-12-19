import { useRef } from "react"
import SettingsBar from "@pages/components/MainComponents/components/SettingsBar"
import UpperLine from "@pages/components/MainComponents/components/UpperLine"

export default function MainComponents(props) {

    var setBarRef = useRef()

    return (
        <div className="MainComponents">
            <UpperLine setBarRef={setBarRef} roomName={props.roomName} loading={props.loading} />

            <SettingsBar setBarRef={setBarRef} />
        </div>
    )
}
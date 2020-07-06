import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1
    }

    if (notification.hidden) {
        return null
    }
    return (
        <div style={style}>
        {notification.msg}
        </div>
    )
}

export default Notification
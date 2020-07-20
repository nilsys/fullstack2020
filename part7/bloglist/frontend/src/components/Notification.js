import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification.hidden) {
        return null
    }
    return (
        <div className="container">
            <Alert variant="success">
                {notification.msg}
            </Alert>
        </div>
    )
}

export default Notification
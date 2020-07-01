import React, { useState } from "react"
import Notification from "./Notification"
import blogService from "../services/blogs"
import loginService from "../services/login"

const Login = (props) => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginDetails = await loginService.login({
                "username": username,
                "password": password
            })
            window.localStorage.setItem(
                "loggedInUser", JSON.stringify(loginDetails)
            )
            blogService.setToken(loginDetails.token)
            setPassword("")
            setUsername("")
            props.setUser(loginDetails)
        } catch (err){
            props.changeMessage("Wrong username or password", "error")
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification message={props.message} type={props.messageType}/>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input value={username} onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    Password:
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
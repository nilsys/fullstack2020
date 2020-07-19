import React, { useState } from "react"
import Notification from "./Notification"
import blogService from "../services/blogs"
import loginService from "../services/login"

import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { changeNotification } from "../reducers/notificationReducer"

const Login = (props) => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const dispatch = useDispatch()

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
            dispatch(setUser(loginDetails))
        } catch (err){
            dispatch(changeNotification("Wrong username or password", 3))
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification/>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input id="username" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    Password:
                    <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
import React, { useState } from "react"
import Notification from "./Notification"
import blogService from "../services/blogs"
import loginService from "../services/login"

import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { changeNotification } from "../reducers/notificationReducer"

import { Table, Form, Button } from "react-bootstrap"

const Login = () => {
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
            dispatch(changeNotification("Succesfully logged in", 3))
        } catch (err){
            dispatch(changeNotification("Wrong username or password", 3))
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification/>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                <Form.Label>
                    Username:
                    <Form.Control id="username" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </Form.Label>
                <Form.Label>
                    Password:
                    <Form.Control id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </Form.Label>
                <div>
                    <Button type="submit">Login</Button>
                </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login
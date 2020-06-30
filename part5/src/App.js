import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from "./components/Login"
import blogService from './services/blogs'


const App = () => {
    const [ blogs, setBlogs ] = useState([])
    const [ user, setUser ] = useState(null)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ message, setMessage ] = useState(null)
    const [ messageType, setMessageType] = useState("success")

    useEffect(() => {
        console.log("Loaded blogs")
        blogService.getAll().then(blogs =>
        setBlogs(blogs)
        )  
    }, [])

    useEffect(() => {
        const getUserInfo = window.localStorage.getItem("loggedInUser")
        if (getUserInfo) {
            const user = JSON.parse(getUserInfo)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginDetails = await blogService.login({
                "username": username,
                "password": password
            })
            window.localStorage.setItem(
                "loggedInUser", JSON.stringify(loginDetails)
            )
            setUser(loginDetails)
            blogService.setToken(loginDetails.token)
            setPassword("")
            setUsername("")
        } catch (err){
            changeMessage("Wrong username or password", "error")
        }
    }

    const changeMessage = (message, messageType) => {
        setMessage(message)
        setMessageType(messageType)
        setTimeout(() => {
            setMessage(null)
        }, 2500)
    }

    return (
        <div>
            {user === null ? 
            <Login username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={handleLogin} 
            message={message} messageType={messageType}/>
            : 
            <Blogs user={user} setUser={setUser}
            blogs={blogs} setBlogs={setBlogs}
            changeMessage={changeMessage}
            message={message} messageType={messageType}/>}   
        </div>
    )
}

export default App
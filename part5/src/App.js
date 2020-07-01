import React, { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import blogService from "./services/blogs"


const App = () => {
    const [ blogs, setBlogs ] = useState([])
    const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState(null)
    const [ messageType, setMessageType] = useState("success")

    useEffect(() => {
        const fetch = async () => {
            console.log("Loaded blogs")
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetch()
    }, [])

    useEffect(() => {
        const getUserInfo = window.localStorage.getItem("loggedInUser")
        if (getUserInfo) {
            const user = JSON.parse(getUserInfo)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

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
                <Login message={message} messageType={messageType}
                setUser={setUser} changeMessage={changeMessage}/>
                :
                <Blogs user={user} setUser={setUser}
                    blogs={blogs} setBlogs={setBlogs}
                    changeMessage={changeMessage}
                    message={message} messageType={messageType}/>}
        </div>
    )
}

export default App
import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from "./components/Login"
import blogService from './services/blogs'


const App = () => {
    const [ blogs, setBlogs ] = useState([])
    const [ user, setUser ] = useState(null)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

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
            console.log('ERROR LOGGING', err)
        }

    }

    return (
        <div>
            {user === null ? 
            <Login username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={handleLogin} />
            : 
            <Blogs user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />}   
        </div>
    )
}

export default App
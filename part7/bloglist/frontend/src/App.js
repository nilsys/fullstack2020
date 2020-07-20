import React, {useEffect } from "react"
import { connect } from "react-redux"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Users from "./components/Users"
import User from "./components/User"
import Header from "./components/Header"
import Notification from "./components/Notification"
import { createAllBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import { setAllUsers } from "./reducers/allUsersReducer"

const App = (props) => {
    useEffect(() => {
        console.log("Loaded blogs")
        props.createAllBlogs()
        console.log("Loaded all users")
        props.setAllUsers()
    }, [])

    useEffect(() => {
        const getUserInfo = window.localStorage.getItem("loggedInUser")
        if (getUserInfo) {
            let user = JSON.parse(getUserInfo)
            props.setUser(user)
        }
    }, [])

    // Link the correct user and blog
    const matchUser = useRouteMatch("/users/:id")
    const matchBlog = useRouteMatch("/blogs/:id")
    const linkedUser = matchUser ? props.allUsers.find(u => u.id === matchUser.params.id) : null
    const linkedBlog = matchBlog ? props.blogs.find(b => b.id === matchBlog.params.id): null

    if (props.user === null) {
        return <Login/>
    }

    return (
        <div className="container">
            <Header/>
            <Notification/>
            <Switch>
                <Route path="/users/:id">
                    <User user={linkedUser}/>
                </Route>
                <Route path="/users">
                    <Users/> 
                 </Route>

                 <Route path="/blogs/:id">
                     <Blog blog={linkedBlog}/>
                 </Route>

                <Route path="/">
                    <Blogs/>
                </Route>
            </Switch>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
        allUsers: state.allUsers
    }
  }

const mapDispatchToProps = {
    createAllBlogs,
    setUser,
    setAllUsers
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp
import React, {useEffect } from "react"
import { connect } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Users from "./components/Users"
import Header from "./components/Header"
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

    if (props.user === null) {
        return <Login/>
    }

    return (
        <div>
            <Header/>
            <Switch>
                <Route path="/users">
                    <Users/> 
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
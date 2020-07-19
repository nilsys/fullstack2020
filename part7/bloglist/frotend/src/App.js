import React, {useEffect } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import { connect } from "react-redux"
import { createAllBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"


const App = (props) => {
    useEffect(() => {
        console.log("Loaded blogs")
        props.createAllBlogs()
    }, [])

    useEffect(() => {
        const getUserInfo = window.localStorage.getItem("loggedInUser")
        if (getUserInfo) {
            let user = JSON.parse(getUserInfo)
            props.setUser(user)
        }
    }, [])

    return (
        <div>
            {props.user === null ?
                <Login/>
                :
                <Blogs/>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
  }

const mapDispatchToProps = {
    createAllBlogs,
    setUser
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp
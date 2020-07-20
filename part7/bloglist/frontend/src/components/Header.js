import React from "react"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import "../index.css"

const Header = (props) => {

    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        props.setUser(null)
        console.log("Logged out")
    }

    return (
        <div>
            <div className="navbar">
                <Link className="navitem" to="/blogs">Blogs</Link>
                <Link className="navitem" to="/users">Users</Link>
                {props.user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
            <h2>Blogs</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }

const mapDispatchToProps = {
    setUser
}

const ConnectedHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default ConnectedHeader
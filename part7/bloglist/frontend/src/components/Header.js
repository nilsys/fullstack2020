import React from "react"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"

const Header = (props) => {

    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        props.setUser(null)
        console.log("Logged out")
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {props.user.name} logged in
                <button onClick={() => logout()}>Logout</button>
            </div>
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
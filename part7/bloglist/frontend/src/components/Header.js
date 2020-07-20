import React from "react"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"

const Header = (props) => {

    const logout = () => {
        window.localStorage.removeItem("loggedInUser")
        props.setUser(null)
        console.log("Logged out")
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Blogs</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link to="/blogs">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                    <Navbar.Text>
                        <em>{props.user.name} logged in</em>
                        <Button size="sm" onClick={() => logout()}>Logout</Button>
                    </Navbar.Text>
                </Nav>
            </Navbar>
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
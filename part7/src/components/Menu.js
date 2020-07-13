import React from "react"
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/about">create new</Link>
            <Link style={padding} to="/create">about</Link>
        </div>
    )
}

export default Menu
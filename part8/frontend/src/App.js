import React, {useState, useEffect} from 'react'
import {useApolloClient} from "@apollo/client"
import { Switch, Route, Link } from "react-router-dom"
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login"

const App = () => {
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const user = localStorage.getItem("book-token")
        if (user){
            setToken(user)
        }
    }, [])

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    const padding = {
        padding: 5
    }

return (
    <div>
        <div>
            <Link style={padding} to="/">Authors</Link>
            <Link style={padding} to="/books">Books</Link>
            {token ? 
                <Link style={padding} to="/newbook">New book</Link>
                :
                <Link style={padding} to="/login">Login</Link>
            }
            {token ? <button onClick={e => logout()}>Logout</button>: null}

      </div>

    <Switch>
        <Route path="/books">
            <Books/>
        </Route>
        <Route path="/newbook">
            <NewBook/>
        </Route>
        <Route path="/login">
            <Login token={token} setToken={setToken}/>
        </Route>
        <Route path="/">
            <Authors/>
        </Route>
    </Switch>
     
    </div>
  )
}

export default App
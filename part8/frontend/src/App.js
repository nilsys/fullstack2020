import React, {useState, useEffect} from 'react'
import {useApolloClient, useSubscription} from "@apollo/client"
import { Switch, Route, Link, Redirect } from "react-router-dom"
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login"
import Recommends from "./components/Recommends"
import { BOOK_ADDED } from "./queries"


const App = () => {
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const user = localStorage.getItem("book-token")
        if (user){
            setToken(user)
        }
    }, [])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const data = subscriptionData.data.bookAdded
            console.log(data)
            window.alert(`${data.title} published in ${data.published} by ${data.author.name} created!`)
        }
    })

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
                <>
                <Link style={padding} to="/newbook">New book</Link>
                <Link style={padding} to="/recommend">Recommend</Link>
                <button onClick={e => logout()}>Logout</button>
                </>
                :
                <Link style={padding} to="/login">Login</Link>
            }

      </div>

    <Switch>
        <Route path="/books">
            <Books/>
        </Route>
        <Route path="/recommend">
            {token ? 
            <Recommends/> : <Redirect to="/"></Redirect>}
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
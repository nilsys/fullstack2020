import React from 'react'
import { Switch, Route, Link } from "react-router-dom"
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
    const padding = {
        padding: 5
      }

return (
    <div>
        <div>
            <Link style={padding} to="/">Authors</Link>
            <Link style={padding} to="/books">Books</Link>
            <Link style={padding} to="/newbook">New book</Link>
      </div>

    <Switch>
        <Route path="/books">
            <Books/>
        </Route>
        <Route path="/newbook">
            <NewBook/>
        </Route>
        <Route path="/">
            <Authors/>
        </Route>
    </Switch>
     
    </div>
  )
}

export default App
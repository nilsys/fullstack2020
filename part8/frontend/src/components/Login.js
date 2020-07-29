import React, {useState, useEffect} from "react"
import { Redirect } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { LOGIN_QUERY } from "../queries"

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loginUser, result] = useMutation(LOGIN_QUERY, {
        onError: (error) => {
          console.log(error.graphQLErrors[0].message)
        }
      })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem("book-token", token)
        }
    }, [result.data]) //eslint-disable-line

    if (props.token){
        return <Redirect to="/"/>
    }

    const login = (e) => {
        e.preventDefault()
        loginUser({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={login}>
                <div>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
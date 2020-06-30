import React from 'react'
import Notification from "./Notification"

const Login = (props) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Notification message={props.message} type={props.messageType}/>
            <form onSubmit={props.handleLogin}>
                <div>
                    Username: 
                    <input value={props.username} onChange={({target}) => props.setUsername(target.value)}/>
                </div>
                <div>
                    Password: 
                    <input type="password" value={props.password} onChange={({target}) => props.setPassword(target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        
    )
}

export default Login
import React from 'react'

const Login = ({username, setUsername, password, setPassword, handleLogin}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username: 
                    <input value={username} onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    Password: 
                    <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        
    )
}

export default Login
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Users = (props) => {
    
    return (
        <div>
            <h2>Users</h2>
            <div>
                <table>
                    <tbody>
                        <th>Name</th>
                        <th>Blogs created</th>
                        {props.allUsers.map(user => {
                            const url = `/users/${user.id}`
                            return (
                                <tr>
                                    <td> <Link to={url}>{user.name}</Link> </td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers
    }
  }

const mapDispatchToProps = {
    
}

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)

export default ConnectedUsers
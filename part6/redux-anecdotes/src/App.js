import React from 'react'
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from 'react-redux'
import {changeNotification, showNotification} from "./reducers/notificationReducer"

const App = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications)

    const changeMessage = (text) => {
        dispatch(changeNotification(text))
        if (notifications.hidden) {
            dispatch(showNotification())
            setTimeout(() =>{
                dispatch(showNotification())
        
            }, 5000)
        }
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <AnecdoteList changeMessage={changeMessage}/>
            <AnecdoteForm changeMessage={changeMessage}/>
        </div>
        )
}

export default App
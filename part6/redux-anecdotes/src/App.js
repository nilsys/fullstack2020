import React, { useEffect } from 'react'
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useDispatch, useSelector } from 'react-redux'
import { addAllAnecdotes } from "./reducers/anecdoteReducer"
import {changeNotification, showNotification} from "./reducers/notificationReducer"

import anecdoteServer from "./services/anecdoteServer"

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

    useEffect(() => {
        anecdoteServer.getAll().then((resp) => {
            dispatch(addAllAnecdotes(resp))
        })
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <Filter/>
            <AnecdoteList changeMessage={changeMessage}/>
            <AnecdoteForm changeMessage={changeMessage}/>
        </div>
        )
}

export default App
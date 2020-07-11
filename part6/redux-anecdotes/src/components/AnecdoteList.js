import React from "react"
import { connect, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"


const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(changeNotification(`You voted ${anecdote.content}`, 3))
    }
    
    return (
        <div>
            {props.anecdotes.sort((a, b) => b.votes - a.votes)
            .filter(anecdote => anecdote.content.includes(props.filter.msg))
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
  }

const ConnectedNotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedNotes
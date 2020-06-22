import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length) + 0)
  }

  const handleVote = (value) => {
    const copyVotes = [...votes]
    copyVotes[value] = votes[value] + 1;
    setVotes(copyVotes)

    // Set the most voted anecdote
    if (votes[value] >= votes[mostVotes]){
      setMostVotes(value)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button onClick={() => handleVote(selected)} text={"vote"}/>
        <Button onClick={handleRandom} text={"next anecdote"}/>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[mostVotes]}
        <div>
        has {votes[mostVotes]} votes
      </div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
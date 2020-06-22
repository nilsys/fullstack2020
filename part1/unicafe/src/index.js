import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TextHeader = ({text}) => {
  return <h1>{text}</h1>
}

const TextSmall = ({text, number}) => {
  return <p>{text} {number}</p>
}

const Button = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <TextHeader text="give feedback"/>
      <Button onClick={() => {setGood(good + 1)}} text={"good"}/>
      <Button onClick={() => {setNeutral(neutral + 1)}} text={"neutral"}/>
      <Button onClick={() => {setBad(bad + 1)}} text={"bad"}/>
      <TextHeader text="statistics"/>

      <TextSmall text="good" number={good}/>
      <TextSmall text="neutral" number={neutral}/>
      <TextSmall text="bad" number={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
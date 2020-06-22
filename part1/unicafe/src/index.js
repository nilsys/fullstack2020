import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [positive, setPositive] = useState(0)

  const TextHeader = ({text}) => {
    return <h1>{text}</h1>
  }
  
  const TextSmall = ({text, number}) => {
    return <div> {text} {number} </div>
  }

  const Positive = ({text, number}) => {
    return <div> {text} {number} % </div>
  }

  const Button = (props) => {
    return <button onClick={props.onClick}> {props.text} </button>
  }
  
  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <TextHeader text="give feedback"/>
      <Button onClick={handleGood} text={"good"}/>
      <Button onClick={handleNeutral} text={"neutral"}/>
      <Button onClick={handleBad} text={"bad"}/>
      <TextHeader text="statistics"/>

      <TextSmall text="good" number={good}/>
      <TextSmall text="neutral" number={neutral}/>
      <TextSmall text="bad" number={bad}/>
      <TextSmall text="all" number={all}/>
      <TextSmall text="average" number={((good * 1 + neutral * 0 + bad * -1) / all)}/>
      <Positive text="positive" number={(good / all * 100 )}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
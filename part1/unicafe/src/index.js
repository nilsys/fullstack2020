import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {

  const TextSmall = ({text, number}) => {
    return <div> {text} {number} </div>
  }

  const Positive = ({text, number}) => {
    return <div> {text} {number} % </div>
  }

  if (props.all === 0){
    return( 
      <div> 
      <h1>statistics</h1>
      No feedback given 
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <TextSmall text={"good"} number={props.good}/>
      <TextSmall text={"neutral"} number={props.neutral}/>
      <TextSmall text={"bad"} number={props.bad}/>
      <TextSmall text={"all"} number={props.all}/>
      <TextSmall text={"average"} number={((props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all)}/>
      <Positive text={"positive"} number={(props.good / props.all * 100 )}/>
    </div>
  )

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const TextHeader = ({text}) => {
    return <h1>{text}</h1>
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
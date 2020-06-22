import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {

  const Statistic = ({text, value}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Positive = ({text, value}) => {
    return (
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      )
    }

  if (props.all === 0){
    return( 
      <div> 
      No feedback given 
      </div>
    )
  }

  return (
      <table>
      <tbody>
        <Statistic text={"good"} value={props.good}/>
        <Statistic text={"neutral"} value={props.neutral}/>
        <Statistic text={"bad"} value={props.bad}/>
        <Statistic text={"all"} value={props.all}/>
        <Statistic text={"average"} value={((props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all)}/>
        <Positive text={"positive"} value={(props.good / props.all * 100 )}/>
      </tbody>
      </table>
  )

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const TextHeader = ({text}) => {
    return <h2>{text}</h2>
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
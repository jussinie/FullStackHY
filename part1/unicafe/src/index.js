import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
} 

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad, allClicks}) => {
  if (allClicks === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={allClicks}/>
      <StatisticLine text="average" value={(good*1 + bad*-1) / (good + neutral + bad)}/>
      <StatisticLine text="positive" value={good/(good + neutral + bad)*100}/>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
      <td>{text}</td><td>{value}%</td>
    </tr>
    )
  }
  
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleSetGood = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <>
      <Header text="give feedback"/>
      <Button handleClick={handleSetGood} text="good"/>
      <Button handleClick={handleSetNeutral} text="neutral"/>
      <Button handleClick={handleSetBad} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))



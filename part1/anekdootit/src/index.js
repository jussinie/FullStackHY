import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0))

  const selectAnecdoteWithClick = () => {
    setSelected(Math.floor(Math.random()*5))
  }

  const vote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }

  const mostPoints = Math.max(...points)
  const indexOfMostPoints = points.indexOf(Math.max(...points))

  //console.log('app rendered')
  //console.log(Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0))
  console.log(points)
  console.log(mostPoints)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <p>has {points[selected]} votes</p>
        <button onClick={vote}>
          vote</button>
        <button onClick={selectAnecdoteWithClick}>
          next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[indexOfMostPoints]}
        <p>has {mostPoints} votes</p>
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
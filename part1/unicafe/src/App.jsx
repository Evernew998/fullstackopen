import { useState } from 'react'

const Button = (props) => {
   return (
    <button onClick={props.handleClick}>{props.text}</button>
   )
}

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.avg}</p>
      <p>positive {props.positivePercentage} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positivePercentage = good / all * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Statistics 
        good={ good } 
        neutral={ neutral } 
        bad={ bad }
        all={ all }
        avg={ avg }
        positivePercentage={ positivePercentage }
      />
    </div>
  )
}

export default App

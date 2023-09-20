import { useState } from 'react'

const Button = (props) => {
   return (
    <button onClick={props.handleClick}>{props.text}</button>
   )
}

const Statistics = (props) => {
  const { good, neutral, bad, all, avg, positivePercentage } = props
  if (good != 0 || neutral != 0 || bad != 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avg}</p>
        <p>positive {positivePercentage} %</p>
      </>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
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

import { useState } from 'react'

const StatisticLine = ({text, value, punctuation}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value} {punctuation}</td>
      </tr>
    </>
  )
}

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
        <table>
          <tbody>
            <StatisticLine text="good" value={good} punctuation={""} /> 
            <StatisticLine text="neutral" value={neutral} punctuation={""} />  
            <StatisticLine text="bad" value={bad} punctuation={""} />  
            <StatisticLine text="all" value={all} punctuation={""} /> 
            <StatisticLine text="average" value={avg} punctuation={""} />
            <StatisticLine text="positive" value={positivePercentage} punctuation={"%"} />
          </tbody>
        </table>
      </>
    )
  }
  else {
    return (
      <>
        <p>No feedback given</p>
      </>
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
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
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

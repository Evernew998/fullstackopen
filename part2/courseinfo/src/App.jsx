const Part = ({ parts }) => {

  const partsInPTag = parts.map(part =>
    <p key={part.id}>{part.name} {part.exercises}</p>
  )

  console.log("Array of parts in p tag", partsInPTag)

  return partsInPTag
}

const Content = ({ parts }) => {
  return (
    <>
      <Part parts={parts} />
    </>
  )
}

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App

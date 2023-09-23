const Total = ( {parts} ) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)

  return (
    <>
      <p>total of {totalExercises} exercises</p>
    </>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Content = ({ parts }) => {
  const partsComponents = parts.map(part =>
    <Part
      key={part.id} 
      name={part.name}
      exercises={part.exercises}
    />
  )

  return <>{partsComponents}</>
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
      <Total parts={course.parts}/>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
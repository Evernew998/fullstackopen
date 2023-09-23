const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)

  return (
    <>
      <b>total of {totalExercises} exercises</b>
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
      <h2>{name}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
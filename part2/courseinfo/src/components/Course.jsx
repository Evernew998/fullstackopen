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

  export default Course
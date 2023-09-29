import PersonDetails from "./PersonDetails"

const Persons = ({ personsToBeShown, handleDeletePerson }) => {
  const listOfPeople = personsToBeShown.map(person => 
    <PersonDetails 
      key={person.id} 
      name={person.name} 
      number={person.number}
      handleDeletePerson={() => handleDeletePerson(person.id, person.name)}
    />
  )
    return (
      <ul>
        {listOfPeople}
      </ul>
    )
}

export default Persons
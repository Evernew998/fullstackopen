import PersonDetails from "./PersonDetails"

const Persons = ({ personsToBeShown }) => {
    return (
      personsToBeShown.map(person => 
        <PersonDetails key={person.name} name={person.name} number={person.number}/>
      )
    )
}

export default Persons
import { useState } from 'react'

const PersonDetails = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const Persons = ({ personsToBeShown }) => {
  return (
    personsToBeShown.map(person => 
      <PersonDetails key={person.name} name={person.name} number={person.number}/>
    )
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Filter = ({ filter, handleNameFilter }) => {
  return (
    <div>
      filter shown with<input value={filter} onChange={handleNameFilter}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToBeShown, setPersonsToBeShown] = useState(persons)

  const addName = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      window.alert("Name or number is missing")
      return
    }

    const personsNames = persons.map(person => person.name)
    const personsNumbers = persons.map(person => person.number)

    if (personsNames.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    if (personsNumbers.includes(newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setPersonsToBeShown(personsToBeShown.concat(personObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    const personsFiltered = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    
    setFilter(event.target.value)
    setPersonsToBeShown(personsFiltered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNameFilter={handleNameFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToBeShown={personsToBeShown}/>
    </div>
  )
}

export default App

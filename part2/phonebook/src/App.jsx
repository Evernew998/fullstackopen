import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToBeShown, setPersonsToBeShown] = useState([])

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToBeShown(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
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

    personService
      .createPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setPersonsToBeShown(personsToBeShown.concat(response))
        console.log(response)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    const personsFiltered = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    
    setFilter(event.target.value)
    setPersonsToBeShown(personsFiltered)
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`Delete ${name}`)

      personService
        .deletePerson(id, name)
        .then((response)=> {
          setPersons(persons.filter(person => id !== person.id))
          setPersonsToBeShown(persons.filter(person => id !== person.id))
        })
        .catch(error => {
          alert(`${name} was already deleted`)
          setPersons(persons.filter(person => id !== person.id))
          setPersonsToBeShown(persons.filter(person => id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNameFilter={handleNameFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        personsToBeShown={personsToBeShown}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App

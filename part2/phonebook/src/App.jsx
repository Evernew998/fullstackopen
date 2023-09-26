import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToBeShown, setPersonsToBeShown] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promised fulfilled')
        setPersons(response.data)
        setPersonsToBeShown(response.data)
      })
  }, [])
  console.log('render', persons.length, 'people')

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

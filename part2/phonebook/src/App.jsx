import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToBeShown, setPersonsToBeShown] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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

    const personObject = {
      name: newName,
      number: newNumber
    }

    const personsNames = persons.map(person => person.name)
    const personsNumbers = persons.map(person => person.number)

    if (personsNames.includes(newName)) {
      if (personsNumbers.includes(newNumber)) {
        window.alert(`${newName} is already added to phonebook`)
        return
      }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons[personsNames.indexOf(newName)].id
        personService
          .updatePhoneNumber(id, personObject)
          .then(updatedPerson => {
            console.log(updatedPerson)
            console.log(persons)
            console.log(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))

            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setPersonsToBeShown(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setMessage(`Successfully updated phone number for ${newName}`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
              setMessageType('')
            }, 5000);
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== id))
            setPersonsToBeShown(persons.filter(person => person.id !== id))
            setMessage(`Information of ${newName} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType('')
            }, 5000);
          })
      }
      return
    }

    if (personsNumbers.includes(newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
      return
    }

    personService
      .createPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setPersonsToBeShown(personsToBeShown.concat(response))
        setMessage(`Successfully added ${newName}`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000);
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
      <Notification message={message} messageType={messageType}/>
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

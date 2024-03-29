import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Confirmation = ({message, style}) => {

  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 

  /*    { id: 0, name: 'Arto Hellas', number: '1234' },    
    { id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 2, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' } */

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showPersons, setShowAll ] = useState(true)
  const [ confirmationMessage, setConfirmationMessage ] = useState(null)
  const [ messageStyle, setMessageStyle ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const confirmationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked & name added')
    const personObject = {
        id: persons.length + 100,
        name: newName,
        number: newNumber
    }

    if (persons.some(e => e.name === newName)) {
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      const person = persons.find(p => p.name === newName)
      const updatedPerson = { ...person, number: newNumber}

      personService
        .update(person.id, updatedPerson)
        .then(response => (
          setPersons(persons.map(person => person.name !== updatedPerson.name ? person : response.data))
        ))
        .catch(error => {
          setMessageStyle(errorStyle)
          setConfirmationMessage(
            `${updatedPerson.name} was already removed from server!`
          )
          setTimeout(() => {
            setConfirmationMessage(null)
            setMessageStyle(null)
          }, 2000)

          setPersons(persons.filter(p => p.id !== person.id))
        })

        setMessageStyle(confirmationStyle)
        setConfirmationMessage(
          `Updated ${personObject.name}` 
        )
        setTimeout(() => {
          setConfirmationMessage(null)
          setMessageStyle(null)
        }, 2000)
  
        setNewName('')
        setNewNumber('')


    } else {
      setPersons(persons.concat(personObject))
      console.log('henkilö lisätty listaan')

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      setMessageStyle(confirmationStyle)
      setConfirmationMessage(
        `Added ${personObject.name}` 
      )
      setTimeout(() => {
        setConfirmationMessage(null)
        setMessageStyle(null)
      }, 2000)

      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService
      .deletePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      console.log('delete person from function', id)
    }
  }

  const handleNameChange = (event) => {
      //console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    console.log('new filter', newFilter)
    if (setNewFilter === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const personsToShow = showPersons
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={confirmationMessage} style={messageStyle}/>
      <FilterForm handleFilter={handleFilter}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
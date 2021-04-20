import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'

const Confirmation = ({message}) => {
  const confirmationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5
  }

  if (message === null) {
    return null
  }

  return (
    <div style={confirmationStyle}>
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

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked & name added')
    const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
    }

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      console.log('henkilö lisätty listaan')

      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      setConfirmationMessage(
        `Added ${personObject.name}` 
      )
      setTimeout(() => {
        setConfirmationMessage(null)
      }, 2000)

      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      noteService
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
      <Confirmation message={confirmationMessage}/>
      <FilterForm handleFilter={handleFilter}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
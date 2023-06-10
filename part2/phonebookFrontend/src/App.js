
import React, {useState, useEffect} from 'react'
import './index.css'
import personService from './services/PersonService'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [siteMessage, setSiteMessage] = useState(null)
  const [siteMessageType, setSiteMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const namesList = persons.map(persons => persons.name)
      if (namesList.includes(newName)) {
        const message = `${newName} is already in the phonebook. Replace the old number with a new one?`
        const confirm = window.confirm(message)
          setSiteMessageType('confirm', id='confirm')
        if (confirm) {
          updateName(nameObject)
      }
    } else {
    personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            JSON.stringify(returnedPerson)
            setSiteMessage(`Added ${returnedPerson} to Phonebook`)
            setSiteMessageType('info', id='info')
          })
        } 
    } 

  const showPersons = newFilter ? 
      persons.filter(persons => persons.name.toLowerCase().includes(newFilter.toLowerCase())) :
      persons

  const updateName = (nameObject) => {
   const updatePersons = persons.find(p => p.name === nameObject.name)
   const updateId = updatePersons.id
    personService 
          .update(updateId, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(persons => persons.id !== updateId ? persons : returnedPerson))
          })
          .catch(error => {
            setSiteMessage(`the person '${nameObject.name}' can't be found, dreadfully sorry ${error}`)
            setSiteMessageType('error', id='error')
            setTimeout(() => {
              setSiteMessage(null)
            }, 10000)
            setPersons(persons.filter(p => p.id !== updateId))
          })
        }

    const deleteName = (person) => {
      const message = `Delete ${person.name}?`
      const confirm = window.confirm(message)
      if (confirm) {
        personService
        .deletePerson(person.id)
        .then(persons => 
          setPersons(persons))
      }
    }

  return (
    <div className="body">
      <h2>Phonebook</h2>
      <Notification message={siteMessage} type={siteMessageType} />
        Search For: <input type="text" value={newFilter} onChange={event => setNewFilter(event.target.value)} />
      <h3>Add Contact</h3>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>
      {showPersons.map(persons => 
          <Persons key={persons.id} persons={persons} deleteEntry={() => deleteName(persons)} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App

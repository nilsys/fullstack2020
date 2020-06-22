import React, { useState } from 'react'
import Numbers from './components/Numbers'
import Input from './components/Input'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => {return person.name === newName})) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({"name": newName, "number": newNumber}))
      setNewName("")
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
       <Input name="name:" value={newName} onChange={handleNewName}/>
       <Input name="number:" value={newNumber} onChange={handleNewNumber}/>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App
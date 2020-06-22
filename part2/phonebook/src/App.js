import React, { useState } from 'react'
import Numbers from './components/Numbers'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewName = (e) => {
    console.log(newName)
    setNewName(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({"name": newName}))
    setNewName("")

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
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
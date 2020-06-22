import React, { useState } from 'react'
import Persons from './components/Persons'
import Input from './components/Input'
import PersonForm from './components/PersonForm'


const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 

    const [ newFilter, setNewFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value)
    }
    
    const handleNewFilter = (e) => {
        setNewFilter(e.target.value)
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
            <div>
                <h2>Phonebook</h2>
                <Input name="filter shown with" value={newFilter} onChange={handleNewFilter}/>
            </div>

            <h3>Add a new</h3>
            <PersonForm newNumber={newNumber} newName={newName}
            handleName={handleNewName}
            handleNumber={handleNewNumber}
            handleSumbit={handleSubmit} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={newFilter} />
        </div>
    )
    }

export default App
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import NumberService from './services/Numbers'
import Notification from './components/Notification'


const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newFilter, setNewFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ messageType, setMessageType] = useState("success")
    const [ update, setUpdate] = useState(false)

    useEffect(() => {
        NumberService
        .getNumbers()
        .then(resp => {
            setPersons(resp)
            setUpdate(false)
        })
    }, [update])

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

        if (persons.some((person) => {return (person.name === newName) })) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(n => n.name === newName)
                handleUpdateNumber(newNumber, person.id)
                changeMessage(`Updated ${newName}'s number to ${newNumber}`, "success")
            }
        } else {
            const newPerson = {"name": newName, "number": newNumber}
            NumberService
            .create(newPerson)
            .then(resp => {
                setPersons(persons.concat(resp))
                setNewName("")
                setNewNumber("")
                changeMessage(`Added ${newName}`, "success")
            })
        }
    }

    const handleDelete = (name, id) => {
        if (window.confirm(`Delete ${name}?`)){
            NumberService.deleteNumber(id)
            .then(() => {
                setUpdate(true)
                changeMessage(`Deleted ${name} succesfully`, "success")
            })
        
        }
    }

    const handleUpdateNumber = (newNumber, id) => {
        const person = persons.find(n => n.id === id)
        person.number = newNumber
        NumberService
        .updateNumbers(person, id)
        .then(() => {
            setNewName("")
            setNewNumber("")
            // This is pretty bubblegum but got dammit i dont know
            // what else to do !!
            setUpdate(true)
        })
        .catch(() => {
            changeMessage(`Information of ${person.name} has already been removed from server`, "error")
        })
    }

    const changeMessage = (message, messageType) => {
        setMessage(message)
        setMessageType(messageType)
        setTimeout(() => {
            setMessage(null)
        }, 2500)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} type={messageType}/>
            <div>
                <Input name="Filter shown with" value={newFilter} onChange={handleNewFilter}/>
            </div>

            <h3>Add a new</h3>
            <PersonForm newNumber={newNumber} newName={newName}
            handleNewName={handleNewName}
            handleNewNumber={handleNewNumber}
            handleSubmit={handleSubmit} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={newFilter}
            handleDelete={handleDelete} />
        </div>
    )
    }

export default App
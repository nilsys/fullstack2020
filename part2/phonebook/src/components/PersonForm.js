import React from 'react'
import Input from './Input'

const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, handleSubmit}) => {
    return (
        <form>
            <Input name="Name:" value={newName} onChange={handleNewName}/>
            <Input name="Number:" value={newNumber} onChange={handleNewNumber}/>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

export default PersonForm
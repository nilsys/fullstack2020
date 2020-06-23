import React from 'react'

const Persons = ({persons, filter, handleDelete}) => {

  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
          return (
            <div key={person.name}>
              {person.name} {person.number}
              <button type="submit"
              onClick={() => {handleDelete(person.name, person.id)}}>Delete</button>
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}


export default Persons
import React from 'react'

const Numbers = ({persons, filter}) => {

  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
          return <div key={person.name}>{person.name} {person.number}</div>
        }
      })}
    </div>
  )
}


export default Numbers
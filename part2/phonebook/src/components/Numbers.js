import React from 'react'

const Numbers = ({persons}) => {
    return (
      <div>
        {persons.map((person) => {
          return <div key={person.name}>{person.name}</div>
        })}
      </div>
    )
}

export default Numbers
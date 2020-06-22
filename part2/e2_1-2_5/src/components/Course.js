import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce(((total, parts) => {
        return total + parts.exercises
    }), 0)
    
    return(
      <p><b>Total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => 
            <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }

  const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
  }

  export default Course
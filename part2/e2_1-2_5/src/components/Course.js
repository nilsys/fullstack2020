import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    return(
      <p>Number of exercises {sum}</p>
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

  const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name}/>
            <Content parts={props.course.parts}/>
        </div>
    )
  }

  export default Course
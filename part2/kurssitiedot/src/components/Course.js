import React from 'react'

const Course = (props) => {
    console.log('course', props)
    return (
        <>
        <Header name={props.course.name} />
        <Content course = {props.course} />
        </>
    )
}
  
const Header = ({name}) => {
  return (
    <>
    <h2>{name}</h2>
    </>
  )  
}
  
const Content = (props) => {
    console.log('content', props)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    
    const points = props.course.parts.map(course => course.exercises)
    console.log(points)
    const total = points.reduce(reducer)
    console.log(total)
  
    return (
      <div>
        {props.course.parts.map(course =>
          <Part key={course.id} course={course} />
        )}
        total of {total} exercises
      </div>
    )
}
  
const Part = (props) => {
    return (
      <p>
        {props.course.name} {props.course.exercises}
      </p>
    )
}

export default Course
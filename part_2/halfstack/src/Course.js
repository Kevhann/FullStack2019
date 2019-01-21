import React from 'react'

const Header = ({ header }) => {
    return <h1>{header}</h1>
}
const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <CourseContent parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
const CourseContent = ({ parts }) =>
    parts.map(part => (
        <CoursePart key={part.id} name={part.name} exercises={part.exercises} />
    ))

const CoursePart = ({ name, exercises }) => (
    <li>
        {name} {exercises}
    </li>
)

const Total = ({ parts }) => {
    const total = parts
        .map(part => part.exercises)
        .reduce((s, p) => {
            return s + p
        })
    return <p>yhteensä {total} tehtävää</p>
}

export default Course
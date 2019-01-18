import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  const course = {
    name: "Half Stack -sovelluskehitys",
    parts: [
      {
        name: "Reactin perusteet",
        exercises: 10
      },
      {
        name: "Tiedonvälitys propseilla",
        exercises: 7
      },
      {
        name: "Komponenttien tila",
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
const Header = props => {
  return <h1>{props.course}</h1>
}
const Content = props => {
  return (
    <>
      <Part p={props.parts[0]} />
      <Part p={props.parts[1]} />
      <Part p={props.parts[2]} />
    </>
  )
}
const Part = props => {
  return (
    <div>
      {props.p.name} {props.p.exercises}
    </div>
  )
}
const Total = props => {
  return (
    <p>
      yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

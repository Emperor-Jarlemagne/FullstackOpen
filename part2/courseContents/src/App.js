import Course from './components/Course'


const App = () => {
  const course = [
    {
    id: 1,
    name: 'Half Stack Application Development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      }, 
      {
        name: 'Using Props to Pass Data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a Component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    id: 2,
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ]
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {course.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
  }

/*
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} : {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of Exercises: {" "} 
      {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
} 
*/

export default App
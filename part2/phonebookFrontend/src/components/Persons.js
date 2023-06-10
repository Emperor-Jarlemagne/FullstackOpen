
const Persons = ({persons, deleteEntry}) => {
    return(
      <li>{persons.name} : {persons.number} <button onClick={deleteEntry}>Delete</button></li>
    )
  }

  export default Persons

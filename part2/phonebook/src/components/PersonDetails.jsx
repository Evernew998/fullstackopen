const PersonDetails = ({ name, number, handleDeletePerson }) => {
    return (
      <li>
        {name} {number} <button onClick={handleDeletePerson}>delete</button>
      </li>
    )
}

export default PersonDetails
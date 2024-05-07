export default function PersonList({ filteredPersons, handleDeletePerson }) {
  const handleConfirm = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) return handleDeletePerson(person.id);
  };

  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
            <button onClick={() => handleConfirm(person)} type="button">
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

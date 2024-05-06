export default function PersonList({ filteredPersons }) {
  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
          </li>
        ))}
      </ul>
    </>
  );
}

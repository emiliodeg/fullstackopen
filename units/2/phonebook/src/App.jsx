import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import Notification from "./components/Notification";
import personsSrv from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setPhoneNumber] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsSrv.getAll().then((data) => setPersons(data));
  }, []);

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleDeletePerson = (person) => {
    personsSrv
      .remove(person.id)
      .then(() => setPersons(persons.filter(({ id }) => person.id !== id)))
      .catch(() => handleResetFormAndShowNotification(`Information of ${person.name} has already been removed from server`, "error"));
  };

  const handleResetFormAndShowNotification = (message, type) => {
    setNotification({ message, type });
    setNewName("");
    setPhoneNumber("");

    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
    if (personExists) {
      if (!confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) return;

      return personsSrv
        .update(personExists.id, { ...personExists, phoneNumber: newPhoneNumber })
        .then((data) => {
          setPersons(persons.map((person) => (person.id !== data.id ? person : data)));

          handleResetFormAndShowNotification(`Updated ${newName}`, "success");
        })
        .catch(() => handleResetFormAndShowNotification(`Information of ${newName} has already been removed from server`, "error"));
    }

    personsSrv.create({ name: newName, phoneNumber: newPhoneNumber }).then((data) => {
      setPersons(persons.concat({ name: data.name, phoneNumber: data.phoneNumber, id: data.id }));
      handleResetFormAndShowNotification(`Added ${newName}`, "success");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new</h2>

      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />

      <h2>Numbers</h2>

      <PersonsList filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;

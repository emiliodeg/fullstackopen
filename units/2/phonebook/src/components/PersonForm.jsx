export default function PersonForm({ handleSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange }) {
  return (
    <>
      <form onSubmit={() => handleSubmit(event)}>
        <div>
          name: <input value={newName} onChange={handleNameChange} name="name" />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} name="phoneNumber" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

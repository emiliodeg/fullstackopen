export default function Filter({ filter, setFilter }) {
  return (
    <>
      <input placeholder="Filter by name" onChange={() => setFilter(event.target.value)} value={filter} />
    </>
  );
}

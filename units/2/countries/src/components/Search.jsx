export default function Search({ search, setSearch }) {
  return (
    <>
      <label>
        find countries <input placeholder="enter country name" onChange={(event) => setSearch(event.target.value)} value={search} />
      </label>
    </>
  );
}

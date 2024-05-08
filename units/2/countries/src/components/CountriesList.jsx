export default function CountriesList({ countries, setSearch }) {
  if (countries.length === 0) return <p>Country not found</p>;
  
  if (countries.length === 1) return null;

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      <ul>
        {countries.map(({ name }) => (
          <li key={name.common}>
            {name.common}
            <button onClick={() => setSearch(name.common)}>show</button>
          </li>
        ))}
      </ul>
    </>
  );
}

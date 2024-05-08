export default function CountryDetail({ country }) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <h2>{country.name.official}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.official} flag`} />
    </>
  );
}

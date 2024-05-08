import { useState } from "react";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import { useEffect } from "react";
import countriesSrv from "./services/countries";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    countriesSrv.getCountries().then((data) => setCountries(data));
  }, []);

  const list = countries.filter(({ name }) => name.common.toLowerCase().includes(search.toLowerCase()));


  return (
    <>
      <Search search={search} setSearch={setSearch} />

      {search && <CountriesList countries={list} />}
      
      {search && list.length === 1 && <CountryDetail country={list[0]} />}
    </>
  );
}

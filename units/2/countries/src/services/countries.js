import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/";

const getCountries = () => axios.get(`${url}/api/all`).then(({ data }) => data);

export default {
    getCountries
}
import axios from "axios";

const apiUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(apiUrl).then(({ data }) => data);

const create = (newPerson) => axios.post(apiUrl, newPerson).then(({ data }) => data);

export default {
  getAll,
  create,
};

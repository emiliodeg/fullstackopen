import axios from "axios";

const apiUrl = "http://localhost:3001/api/persons";

const getAll = () => axios.get(apiUrl).then(({ data }) => data);

const create = (newPerson) => axios.post(apiUrl, newPerson).then(({ data }) => data);

const update = (id, data) => axios.put(`${apiUrl}/${id}`, data).then(({ data }) => data);

const remove = (id) => axios.delete(`${apiUrl}/${id}`).then(({ data }) => data);

export default {
  getAll,
  create,
  update,
  remove,
};

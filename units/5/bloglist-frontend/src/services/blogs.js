import axios from "axios";
const baseUrl = "/api/blogs";

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, setToken };

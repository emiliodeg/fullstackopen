import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (content) => {
  const { data } = await axios.post(baseUrl, {content, votes: 0});
  return data;
};

export default { getAll, create };

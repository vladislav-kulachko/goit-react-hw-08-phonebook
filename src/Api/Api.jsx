import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = "";
  },
};

export async function getContactsQuery() {
  const {data} = await axios.get("/contacts");
  return data;
}
export async function addContactQuery(contact) {
  const {data} = await axios.post("/contacts", contact);

  return data;
}
export async function delContactQuery(contactId) {
  await axios.delete(`/contacts/${contactId}`);
}
export async function register(user) {
  const {data} = await axios.post("/users/signup", user);
  token.set(data.token);
  return data;
}
export async function login(user) {
  const {data} = await axios.post("/users/login", user);
  token.set(data.token);
  return data;
}
export async function logout() {
  const {data} = await axios.post("/users/logout");
  token.unset(data.token);
  return data;
}
export async function getUser(currToken) {
  token.set(currToken);
  const {data} = await axios.get("/users/current");
  return data;
}

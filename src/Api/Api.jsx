import axios from 'axios';

const BASE_URL = 'http://localhost:2285';

export async function getContactsQuery() {
  const {data} = await axios.get(`${BASE_URL}/contacts`);
  return data;
}
export async function addContactQuery(contact) {
  const {data} = await axios.post(`${BASE_URL}/contacts`, contact);
  return data;
}
export async function delContactQuery(contactId) {
  await axios.delete(`${BASE_URL}/contacts/${contactId}`);
}

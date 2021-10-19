import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';

import {
  delContact,
  addContact,
  getContacts,
  addFilterValue,
} from './operations';

// {
//   contacts: {
//     items: [],
//     filter: ''
//   }
// }
const filter = createReducer('', {
  [addFilterValue]: (state, {payload}) => payload,
});
const items = createReducer([], {
  [getContacts.fulfilled]: (state, {payload}) => payload,
  [addContact.fulfilled]: (state, {payload}) => [...state, payload],
  [delContact.fulfilled]: (state, {payload}) =>
    state.filter(contact => contact.id !== payload),
});
const isLoading = createReducer(false, {
  [getContacts.pending]: () => true,
  [getContacts.fulfilled]: () => false,
  [getContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [delContact.pending]: () => true,
  [delContact.fulfilled]: () => false,
  [delContact.rejected]: () => false,
});
const error = createReducer(null, {
  [addContact.rejected]: (state, {payload}) => payload,
  [addContact.pending]: () => null,
  [delContact.rejected]: (state, {payload}) => payload,
  [delContact.pending]: () => null,
  [getContacts.rejected]: (state, {payload}) => payload,
  [getContacts.pending]: () => null,
});

const contactsReduser = combineReducers({
  items: items,
  filter: filter,
  isLoading: isLoading,
  error: error,
});
export default contactsReduser;

import {combineReducers} from 'redux';
import {createReducer, createSlice} from '@reduxjs/toolkit';

import {
  delContact,
  addContact,
  getContacts,
  addFilterValue,
} from './contacts-operations';
let initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};
const sliceContacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    [addFilterValue](state, {payload}) {
      state.filter = payload;
    },
  },
  extraReducers: {
    [getContacts.pending](state, {payload}) {
      state.isLoading = true;
      state.error = null;
    },
    [getContacts.fulfilled](state, {payload}) {
      state.items = payload;
      state.isLoading = false;
      state.filter = '';
      state.error = null;
    },
    [getContacts.rejected](state, {payload}) {
      state.error = payload;
      state.isLoading = false;
    },
    [addContact.pending](state, {payload}) {
      state.isLoading = true;
      state.error = null;
    },
    [addContact.fulfilled](state, {payload}) {
      state.items = state.items.push(payload);
      state.isLoading = false;
      state.filter = '';
      state.error = null;
    },
    [addContact.rejected](state, {payload}) {
      state.error = payload;
      state.isLoading = false;
    },
    [delContact.pending](state, {payload}) {
      state.isLoading = true;
      state.error = null;
    },
    [delContact.fulfilled](state, {payload}) {
      state.items = state.items.filter(contact => contact.id !== payload);
      state.isLoading = false;
      state.filter = '';
      state.error = null;
    },
    [delContact.rejected](state, {payload}) {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default sliceContacts.reducer;

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
// export default contactsReduser;

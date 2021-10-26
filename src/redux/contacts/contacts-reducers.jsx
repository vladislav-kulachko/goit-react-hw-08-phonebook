import {createSlice} from '@reduxjs/toolkit';
import {delContact, addContact, getContacts} from './contacts-operations';

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
    addFilterValue(state, {payload}) {
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
      state.items = [...state.items, payload];
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

export const {addFilterValue} = sliceContacts.actions;
export default sliceContacts.reducer;

import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addContactQuery,
  getContactsQuery,
  delContactQuery,
} from '../../Api/Api';

export const getContacts = createAsyncThunk(
  'phonebook/getContact',
  async (_, {getState, rejectWithValue}) => {
    const state = getState();
    const currToken = state.auth.token;
    try {
      return await getContactsQuery(currToken);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'phonebook/addContact',
  async (contact, {getState, rejectWithValue}) => {
    const state = getState();
    const currToken = state.auth.token;
    try {
      return await addContactQuery(contact, currToken);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const delContact = createAsyncThunk(
  'phonebook/delContact',
  async (id, {getState, rejectWithValue}) => {
    const state = getState();
    const currToken = state.auth.token;
    try {
      await delContactQuery(id, currToken);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

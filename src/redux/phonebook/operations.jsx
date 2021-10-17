import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addContactQuery,
  getContactsQuery,
  delContactQuery,
} from '../../Api/Api';

export const getContacts = createAsyncThunk(
  'phonebook/getContact',
  async (_, {rejectWithValue}) => {
    try {
      return await getContactsQuery();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'phonebook/addContact',
  async (contact, {rejectWithValue}) => {
    try {
      return await addContactQuery(contact);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const delContact = createAsyncThunk(
  'phonebook/delContact',
  async (id, {rejectWithValue}) => {
    try {
      await delContactQuery(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import {register, login, logout} from '../../Api/Api';

export const addUser = createAsyncThunk(
  'auth/register',
  async (user, {rejectWithValue}) => {
    try {
      return await register(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, {rejectWithValue}) => {
    try {
      return await login(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      await logout();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

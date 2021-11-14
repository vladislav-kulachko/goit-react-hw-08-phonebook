import {createAsyncThunk} from "@reduxjs/toolkit";
import {register, login, logout, getUser} from "../../Api/Api";

export const addUser = createAsyncThunk(
  "auth/register",
  async (user, {rejectWithValue}) => {
    try {
      return await register(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, {rejectWithValue}) => {
    try {
      return await login(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      await logout();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const getCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, {getState, rejectWithValue}) => {
    const state = getState();
    const token = state.auth.token;
    try {
      return await getUser(token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

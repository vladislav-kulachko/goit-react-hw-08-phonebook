import {createSlice} from "@reduxjs/toolkit";

import {
  addUser,
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../auth/auth-operations";

let initialState = {
  user: {name: null, email: null},
  token: null,
  isLoggedIn: false,
  error: null,
  fetchingUser: false,
};
const sliceAuth = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [addUser.pending](state, {payload}) {
      state.fetchingUser = true;
    },
    [addUser.fulfilled](state, {payload}) {
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
      state.error = null;
      state.fetchingUser = false;
    },
    [addUser.rejected](state, {payload}) {
      state.error = payload;
      state.fetchingUser = false;
    },
    [loginUser.pending](state, {payload}) {
      state.fetchingUser = true;
    },
    [loginUser.fulfilled](state, {payload}) {
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
      state.error = null;
      state.fetchingUser = false;
    },
    [loginUser.rejected](state, {payload}) {
      state.error = payload;
      state.fetchingUser = false;
    },
    [logoutUser.pending](state, {payload}) {
      state.fetchingUser = true;
    },
    [logoutUser.fulfilled](state, {payload}) {
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      state.fetchingUser = false;
    },
    [logoutUser.rejected](state, {payload}) {
      state.error = payload;
      state.fetchingUser = false;
    },
    [getCurrentUser.pending](state, {payload}) {
      state.fetchingUser = true;
    },
    [getCurrentUser.fulfilled](state, {payload}) {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.isLoggedIn = true;
      state.error = null;
      state.fetchingUser = false;
    },
    [getCurrentUser.rejected](state, {payload}) {
      state.fetchingUser = false;
      state.error = payload;
    },
  },
});

export default sliceAuth.reducer;

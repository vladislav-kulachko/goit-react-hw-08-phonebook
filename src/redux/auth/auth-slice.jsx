import {createSlice} from '@reduxjs/toolkit';
import {addUser, loginUser, logoutUser} from '../auth/auth-operations';

let initialState = {
  user: {name: null, email: null},
  token: null,
  isLoggedIn: false,
  error: null,
};
const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [addUser.fulfilled]: (state, {payload}) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [addUser.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [logoutUser.fulfilled]: (state, {payload}) => {
      state.user = initialState;
      state.error = null;
    },
    [logoutUser.rejected]: (state, {payload}) => {
      state.error = payload;
    },
  },
});

export default sliceAuth.reducer;

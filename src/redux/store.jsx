import {configureStore} from '@reduxjs/toolkit';
import contactsReduser from './phonebook/reducers';
import authReduser from './auth/auth-slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {auth: authReduser, contacts: contactsReduser},
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV === 'development',
});

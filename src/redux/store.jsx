import {configureStore} from '@reduxjs/toolkit';
import {contacts} from './phonebook/reducers';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {contacts},
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV === 'development',
});

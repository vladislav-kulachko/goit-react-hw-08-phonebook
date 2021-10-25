import {configureStore} from '@reduxjs/toolkit';
import contactsReduser from './contacts/contacts-reducers';
import authReduser from './auth/auth-slice';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {key: 'auth', storage, whitelist: ['token']};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReduser),
    contacts: contactsReduser,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV === 'development',
});
export const persistor = persistStore(store);

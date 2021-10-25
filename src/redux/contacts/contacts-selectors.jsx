import {createSelector} from '@reduxjs/toolkit';

export const getAllContacts = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
export const getError = state => state.contacts.error;
export const isLoading = state => state.contacts.isLoading;
export const getFilteredContacts = createSelector(
  [getAllContacts, getFilterValue],
  (contacts, filter) => {
    return contacts.filter(({name}) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);
// export const getFilteredContacts = state => {
//   const contacts = getAllContacts(state);
//   const filter = getFilterValue(state).toLowerCase();
//   return contacts.filter(({name}) => name.toLowerCase().includes(filter));
// };

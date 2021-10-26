export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getError = state => state.auth.error;
export const getUserFetching = state => state.auth.fetchingUser;

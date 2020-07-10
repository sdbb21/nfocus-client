export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.email;

export const selectUserById = (id) => (state) => {
  return state.user.find((us) => us.id === id);
};

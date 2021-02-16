export default {
  namespaced: true,
  state: {
    theme: 'light',
  },
  mutations: {
    theme(state, theme) {
      state.theme = theme;
    },
  },
};

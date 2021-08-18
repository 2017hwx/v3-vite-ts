export default {
  state() {
    return {
      a: 0,
      b: '',
      c: false,
    };
  },
  getters: {
    name(state) {
      return state.a + state.b;
    },
  },
  mutations: {
    init(state) {
      state.a++;
      state.b = 'hwx';
      state.c = true;
    },
  },
  actions: {
    start(cxt) {
      cxt.commit('init');
    },
  },
};
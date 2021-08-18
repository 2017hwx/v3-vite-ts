import { createStore } from 'vuex';

const options = {
  modules: {}
}
//const modulefiles = require.context('./modules', false, /\.js$/);
const modulefiles = import.meta.globEager('./modules/*.js');
for (const key in modulefiles) {
  if (Object.prototype.hasOwnProperty.call(modulefiles, key)) {
    options.modules[key] = { namespaced: true, ...modulefiles[key] };
  }
}

const store = createStore(options);
export default store;

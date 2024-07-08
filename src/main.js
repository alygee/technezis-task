import Vue from "vue";
import Vuetify from "vuetify/lib";
import App from "./App.vue";

import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: "mdi",
    },
  }),
  render: (h) => h(App),
}).$mount("#app");

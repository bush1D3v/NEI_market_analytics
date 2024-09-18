import "./assets/css/main.css";

import {createApp} from "vue";
import {createPinia} from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./locales/translator";
import vTranslate from "./config/directive/v-translate";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive("translate", vTranslate);

i18n(app).mount("#app");

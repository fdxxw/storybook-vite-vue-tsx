import { createApp } from "vue";
import App from "./App";
import store from "./store";
import "./assets/style/index.scss"
createApp(App).use(store).mount("#app");

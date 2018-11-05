import { Vue, Component } from "vue-property-decorator";
import * as style from "@/styles/app.module.scss";

@Component
export default class App extends Vue {
  render() {
    return (
      <div id={style.app}>
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <router-view />
      </div>
    );
  }
}

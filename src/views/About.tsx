import { Vue, Component } from "vue-property-decorator";
import * as style from "@/styles/views/about.module.scss";

@Component
export default class About extends Vue {
  render() {
    return (
      <div class={style.about}>
        <h1>This is an about page</h1>
      </div>
    );
  }
}

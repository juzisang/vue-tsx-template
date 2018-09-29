import { Vue, Component } from "vue-property-decorator";
import HelloWorld from "./../components/HelloWorld";
import Logo from "@/assets/logo.png";

@Component
export default class Home extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={Logo} />
        <HelloWorld msg="HelloWorld" />
      </div>
    );
  }
}

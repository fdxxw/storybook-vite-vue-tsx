import { defineComponent, onMounted, Ref, ref, watch, computed } from "vue";
import InboxScreen from "./components/InboxScreen";
import TaskList from "./components/TaskList";
export default defineComponent({
  name: "App",
  props: {},
  emits: [],
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div id="app">
          <TaskList></TaskList>
          <InboxScreen></InboxScreen>
        </div>
      );
    };
  },
});

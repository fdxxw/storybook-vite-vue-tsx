import { defineComponent, onMounted, Ref, ref, watch, computed } from "vue";
import PureTaskList from "../PureTaskList";
import TaskList from "../TaskList";
export default defineComponent({
  name: "PureInboxScreen",
  props: { error: { type: Boolean, default: false } },
  emits: [],
  setup(props, { emit, slots }) {
    return () => {
      return (
        <>
          {props.error ? (
            <div class="page lists-show">
              <div class="wrapper-message">
                {" "}
                <span class="icon-face-sad"></span>
                <div class="title-message">Oh nol</div>
                <div class="subtitle-message">Something went wrong</div>
              </div>
            </div>
          ) : (
            <div class="page lists-show">
              <nav>
                <h1 class="title-page">
                  <span class="title-wrapper">Taskbox</span>
                </h1>
              </nav>
              <TaskList />
            </div>
          )}
        </>
      );
    };
  },
});

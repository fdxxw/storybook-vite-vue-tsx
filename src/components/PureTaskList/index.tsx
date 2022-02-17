import { defineComponent, onMounted, Ref, ref, watch, computed, PropType } from "vue";
import Task, { TaskPropType } from "../Task";
import "./style.scss";
export default defineComponent({
  name: "PureTaskList",
  props: {
    tasks: {
      type: Array as PropType<TaskPropType[]>,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["archive-task", "pin-task"],
  setup(props, { emit, slots }) {
    const isEmpty = computed(() => props.tasks.length === 0);
    const taskInOrder = computed(() => {
      return [
        ...props.tasks.filter((t) => t.state === "TASK_PINNED"),
        ...props.tasks.filter((t) => t.state !== "TASK_PINNED"),
      ];
    });
    const render = () => {
      if (props.loading) {
        return [0, 1, 2, 3, 4, 5].map((n) => (
          <div key={n} class="loading-item">
            <span class="glow-checkbox"></span>
            <span class="glow-text">
              <span>loading</span>
              <span>cool</span>
              <span>state</span>
            </span>
          </div>
        ));
      } else if (isEmpty.value) {
        return (
          <div class="wrapper-message">
            <span class="icon-check"></span>
            <span class="title-message">You have no tasks</span>
            <br />
            <span class="subtitle-message">Sit back and relax</span>
          </div>
        );
      } else {
        return taskInOrder.value.map((task) => (
          <Task
            key={task.id}
            task={task}
            onArchive-task={() => emit("archive-task", task.id)}
            onPin-task={() => emit("pin-task", task.id)}
          ></Task>
        ));
      }
    };
    return () => {
      return <div class="list-items">{render()}</div>;
    };
  },
});

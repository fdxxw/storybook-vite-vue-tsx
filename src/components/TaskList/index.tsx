import { defineComponent, onMounted, Ref, ref, watch, computed, ComputedRef } from "vue";
import { useStore } from "vuex";
import PureTaskList from "../PureTaskList";
import { TaskPropType } from "../Task";
export default defineComponent({
  name: "TaskList",
  emits: [],
  setup(props, { emit, slots }) {
    const store = useStore();
    const tasks: ComputedRef<TaskPropType[]> = computed(() => store.state.tasks);
    const archiveTask = (taskId: string) => store.dispatch("archiveTask", taskId);
    const pinTask = (taskId: string) => store.dispatch("pinTask", taskId);
    return () => {
      return <PureTaskList tasks={tasks.value} onArchive-task={archiveTask} onPin-task={pinTask}></PureTaskList>;
    };
  },
});

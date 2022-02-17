import { defineComponent, onMounted, Ref, ref, watch, computed, PropType } from "vue";
export interface TaskPropType {
  id: string;
  state: string;
  title: string;
  updatedAt?: Date;
}
export default defineComponent({
  name: "Task",
  props: {
    task: {
      type: Object as PropType<TaskPropType>,
      required: true,
      default: () => ({ id: "", state: "", title: "" }),
      validator: (task: TaskPropType) => ["id", "state", "title"].every((key) => key in task),
    },
  },
  emits: ["archive-task", "pin-task"],
  setup(props, { emit, slots }) {
    const classes = computed(() => ({
      "list-item TASK_INBOX": props.task.state === "TASK_INBOX",
      "list-item TASK_PINNED": props.task.state === "TASK_PINNED",
      "list-item TASK_ARCHIVED": props.task.state === "TASK_ARCHIVED",
    }));
    const isChecked = computed(() => props.task.state === "TASK_ARCHIVED");
    return () => {
      return (
        <div class={classes.value}>
          <label class="checkbox">
            <input type="checkbox" checked={isChecked.value} disabled name="checked" />
            <span
              class="checkbox-custom"
              onClick={() => {
                emit("archive-task", props.task.id);
              }}
              aria-label={"archiveTask-" + props.task.id}
            ></span>
          </label>
          <div class="ttile">
            <input type="text" value={props.task.title} readonly placeholder="Input title" />
          </div>
          <div class="actions">
            {!isChecked.value && (
              <a
                onClick={() => {
                  emit("pin-task", props.task.id);
                }}
              >
                <span class="icon-star"></span>
              </a>
            )}
          </div>
        </div>
      );
    };
  },
});

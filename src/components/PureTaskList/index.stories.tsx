import PureTaskList from ".";
import { TaskPropType } from "../Task";
import { Story } from "@storybook/vue3";
import * as TaskStories from "../Task/index.stories";

export default {
  component: PureTaskList,
  title: "PureTaskList",
  decorators: [() => ({ template: '<div style="margin: 1em;"><story/></div>' })],
  argTypes: {
    onPinTask: { action: true },
    onArchiveTask: { action: true },
  },
};

interface Args {
  tasks: TaskPropType[];
  loading: boolean;
  onArchiveTask: (taskId: string) => void;
  onPinTask: (taskId: string) => void;
}
// export const Basic = () => <Task task={{ id: "1", state: "Basic", title: "Basic", updateAt: new Date() }}></Task>;

// const Template: Story<Args> = (props) => ({
//   setup() {
//     return { ...TaskStories.actionsData };
//   },
//   render() {
//     return <TaskList {...props} />;
//   },
// });
const Template: Story<Args> = (props) => (
  <PureTaskList
    tasks={props.tasks}
    loading={props.loading}
    onArchive-task={props.onArchiveTask}
    onPin-task={props.onPinTask}
  ></PureTaskList>
);

export const Default = Template.bind({});
const DefaultArgsTask = TaskStories.Default.args!.task!;
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: [
    { ...DefaultArgsTask, id: "1", title: "Task 1" },
    { ...DefaultArgsTask, id: "2", title: "Task 2" },
    { ...DefaultArgsTask, id: "3", title: "Task 3" },
    { ...DefaultArgsTask, id: "4", title: "Task 4" },
    { ...DefaultArgsTask, id: "5", title: "Task 5" },
    { ...DefaultArgsTask, id: "6", title: "Task 6" },
  ],
  onArchiveTask: TaskStories.actionsData.onArchiveTask,
  onPinTask: TaskStories.actionsData.onPinTask,
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [...Default.args.tasks!.slice(0, 5), { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
Empty.play = async ({ args, canvasElement }) => {};

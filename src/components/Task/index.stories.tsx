import Task, { TaskPropType } from ".";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/vue3";

export default {
  component: Task,
  title: "Task",
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  //👇 Our events will be mapped in Storybook UI
  argTypes: {
    onPinTask: { action: true },
    onArchiveTask: { action: true },
  },
};
export const actionsData = {
  onPinTask: action("pin-task"),
  onArchiveTask: action("archive-task"),
};

interface Args {
  task: TaskPropType;
  onArchiveTask: (taskId: string) => void;
  onPinTask: (taskId: string) => void;
}
// export const Basic = () => <Task task={{ id: "1", state: "Basic", title: "Basic", updateAt: new Date() }}></Task>;

// const Template: Story<TaskArgs> = (props) => ({
//   setup() {
//     return { ...actionsData };
//   },
//   render() {
//     return <Task {...props} />;
//   },
// });
const Template: Story<Args> = (props) => (
  <Task task={props.task} onArchive-task={props.onArchiveTask} onPin-task={props.onPinTask}></Task>
);

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
  onArchiveTask: actionsData.onArchiveTask,
  onPinTask: actionsData.onPinTask,
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task!,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task!,
    state: "TASK_ARCHIVED",
  },
};

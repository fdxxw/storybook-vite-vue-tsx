import { Story, app } from "@storybook/vue3";
import PureInboxScreen from ".";
import { createStore } from "vuex";

import { action } from "@storybook/addon-actions";
import * as TaskListStories from "..//PureTaskList/index.stories";

const store = createStore({
  state: {
    tasks: TaskListStories.Default.args!.tasks,
  },
  actions: {
    pinTask(context, id) {
      action("pin-task")(id);
      const find = context.state.tasks!.find((task) => task.id === id);
      if (find) {
        find.state = "TASK_PINNED";
      }
    },
    archiveTask(context, id) {
      action("archive-task")(id);
      const find = context.state.tasks!.find((task) => task.id === id);
      if (find) {
        find.state = "TASK_ARCHIVED";
      }
    },
  },
});

app.use(store);
export default {
  component: PureInboxScreen,
  title: "PureInboxScreen",
};
interface Args {
  error: boolean;
}
const Template: Story<Args> = (props) => <PureInboxScreen error={props.error}></PureInboxScreen>;

export const Default = Template.bind({});
Default.args = { error: false };
export const Error = Template.bind({});

Error.args = { error: true };

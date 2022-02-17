import { defineComponent, onMounted, Ref, ref, watch, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex';
import PureInboxScreen from '../PureInboxScreen';
export default defineComponent({
  name: 'InboxScreen',
  emits: [],
  setup(props, { emit, slots }) {
    const store = useStore();
    const error: ComputedRef<boolean> = computed(() => store.state.error)
    return () => {
      return <PureInboxScreen error={error.value}></PureInboxScreen>;
    };
  }
})
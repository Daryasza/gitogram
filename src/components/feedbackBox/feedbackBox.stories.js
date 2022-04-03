import feedbackBox from './feedbackBox.vue';

export default {
  title: 'feedbackBox',
  component: feedbackBox,
}

const template = (args) => ({
  components: { feedbackBox },
  setup() {
    return { args };
  },
  template:'<feedbackBox v-bind="args"/>'
})

export const Default = template.bind({})
Default.args = {
  stars: 54,
  forks: 45
}
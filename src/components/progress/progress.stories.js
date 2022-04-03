import cProgress from './progress.vue';

export default {
  title: 'cProgress',
  component: cProgress,
  argTypes: {
    onFinish: {
      action: 'onFinish',
      description: 'Fires when progress reaches the end'
    }
  }
}

const template = (args) => ({
  components: { cProgress },
  data() {
    return { args }
  },
  template:'<cProgress @onFinish="args.onFinish" />'
})

export const Default = template.bind({})
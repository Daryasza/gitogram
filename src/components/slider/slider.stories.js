import cSlider from './slider.vue';

export default {
  title: 'cSlider',
  component: cSlider
}

const template = args => ({
  components: { cSlider },
  setup() {
    return { args };
  },
  template: '<cSlider v-bind="args"/>'
})

export const Default = template.bind({})

Default.args = {
  avatar: 'https://picsum.photos/600',
  username: 'Mark Issa',
}
import userName from './userName.vue';

export default {
  title: 'userName',
  component: userName,
}

const template = args => ({
  components: { userName },
  setup() {
    return {args};
  },
  template: '<userName v-bind="args"/>'
})

export const Default = template.bind({})
Default.args = {
  avatar: 'https://picsum.photos/200',
  username: 'Mark Park'
}
import currentUser from './currentUser.vue';

export default {
  title: 'currentUser',
  component: currentUser,
}

const template = args => ({
  components: { currentUser },
  setup() {
    return { args };
  },
  template: '<currentUser v-bind="args"/>'
})

export const Default = template.bind({})

Default.args = {
  avatar: 'https://picsum.photos/900',
  username: 'User Name',
  nickname: 'username',
  reposts: 25,
  watchers: 433
}
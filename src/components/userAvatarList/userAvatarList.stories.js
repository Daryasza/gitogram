import userAvatarList from './userAvatarList.vue';

export default {
  title: 'userAvatarList',
  component: userAvatarList,
}

const template = args => ({
  components: { userAvatarList },
  setup() {
    return { args };
  },
  template: '<userAvatarList v-bind="args"/>'
})

export const Default = template.bind({})

Default.args = {
  avatar: 'https://picsum.photos/200',
  username: 'User Name'
}